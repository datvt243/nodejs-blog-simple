const express = require('express')
const router = express.Router()
const postModel = require('../models/post')
const categoryModel = require('../models/category')
const userModel = require('../models/user')

const helpers = require('../helpers')

const post = {
  id: null,
	author: null,
	title: null,
	category: null,
  thumbnail: null,
	shotDes: null,
	content: null,
	slug: null,
	isActive: true,
	isPublish: null,
	pubishedAt: null,
	createdAt: null,
	updatedAt: null,
	deletedAt: null,
	tag: null,
	metaTitle: null,
	metaDes: null,
}

const getCategory = async () => {
  let category
  await categoryModel.getAllCategory()
    .then((data) => {
      category = data
    })
  return category
}

router.get('/edit/:id', async (req, res) => {
  const postId = req.params.id

  let flagError = false
  let post

  // Get post
  await postModel.getPostById(+postId)
    .then((data) => {
      post = data[0]
    }).catch((err) => {
      console.log("ERR: ", err)
    })

  // edit value
  post = await (async (post) => {
    await userModel.getUserById(post.author)
      .then((data) => {
        post.author = {
          id: post.author,
          name: data[0].name 
        }
      }).catch((err) => console.log(err))
    post.createdAt    = helpers.formatShortDate(post.createdAt)
    post.pubishedAt   = helpers.formatShortDate(post.pubishedAt)
    if (post.updatedAt !== null || post.updatedAt !== '') {
      post.updatedAt  = helpers.formatShortDate(post.updatedAt)
    }
    return post
  })(post)

  res.render('admin/post/add', {
    data: {
      user: helpers.getSessionUser(req),
      err: flagError,
      method: '',
      action: '',
      category: await getCategory(),
      post: post,
      edit: true
    }
  })

});

router.get('/list', async (req, res) => {
  let posts = null
  let trash = 0

  await postModel.getAllPost()
    .then((data) => {
      posts = data  
    }).catch((err) => {
      console.log(err)
    })

  await postModel.getAllTrash()
    .then((data) => {
      trash = data.length
    })


  posts = await Promise.all(posts.map(async (post) => {
    await categoryModel.getNameCategory(post.category)
      .then((data) => {
        post.category = { id: post.id, name: data[0].name }
      }).catch((err) => console.log(err))

    await userModel.getUserById(post.author)
      .then((data) => {
        post.author = { id: post.author, name: data[0].name }
      })

    post.isPublish = { 
      active: post.isPublish, 
      status: post.isPublish ? 'Last modified' : 'Published' 
    }
    post.createdAt = helpers.formatShortDate(post.createdAt)
    return post
  }))

  res.render('admin/post/list', {
    data: {
      user: helpers.getSessionUser(req),
      posts,
      trash
    }
  })  

})

router.get('/drafts', async (req, res) => {
  let drafts = null
  await postModel.getAllTrash()
    .then((data) => {
      drafts = data
    })

  drafts = await Promise.all(drafts.map(async (draft) => {
    await categoryModel.getNameCategory(draft.category)
      .then((data) => {
        draft.category = { id: post.id, name: data[0].name }
      }).catch((err) => console.log(err))
    return draft
  }))

  res.render('admin/post/drafts', {
    data: {
      user: helpers.getSessionUser(req),
      drafts
    }
  })  
})

router.get('/add', async (req, res) => {
  res.render('admin/post/add', {
    data: {
      user: helpers.getSessionUser(req),
      err: false,
      method: 'POST',
      action: '/admin/post/add',
      category: await getCategory(),
      post: post,
      edit: false
    }
  })
})

router.post('/add', (req, res) => {
  let postInput = req.body

  const newPost = {...post}

  newPost.author      = 27
	newPost.title       = postInput.title
	newPost.category    = postInput.category
  newPost.thumbnail   = null
	newPost.shotDes     = postInput.shotDes
	newPost.content     = postInput.content
	newPost.slug        = 's'
	newPost.isActive    = 0
	newPost.isPublish   = postInput.isPublish ? 0 : 1
	newPost.pubishedAt  = postInput.isPublish ? helpers.formatDate() : null
	newPost.createdAt   = helpers.formatDate()
	newPost.tag         = postInput.tag
	newPost.metaTitle   = postInput.metaTitle
	newPost.metaDes     = postInput.metaDes
  
  postModel.addNewPost(Object.values(newPost))
    .then((data) => {
      res.redirect('/admin/post/list')
    }).catch((err) => {
      console.log('Error: ', err)
    })

})

router.get('/category', (req, res) => {
  res.render('admin/post/category', {
    data: null
  })
})

router.get('/', async (req, res) => {
  res.redirect('/post/list')
})


module.exports = router
