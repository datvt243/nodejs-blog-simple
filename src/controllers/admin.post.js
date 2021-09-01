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
  await categoryModel.selectAllCategory()
    .then(data => category = data)
    .catch(err => console.log(err))
  return category
}

router.get('/edit/:id', async (req, res) => {
  const postId = req.params.id

  let flagError = false
  let post

  // Get post
  await postModel.selectPostById(+postId)
    .then(data => post = data[0])
    .catch(err => console.log(err))

  // edit value
  post = await (async (post) => {
    await userModel.selectUserById(post.author)
      .then(data => {
        post.author = {
          id: post.author,
          name: data[0].name 
        }
      }).catch(err => console.log(err))
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
  let postsAll = 0, trash = 0, draft = 0

  let author = (req => {
    let user = req.session.User
    return user.userRole ? '' : user.id
  })(req)
  
  await postModel.selectAllPostByAuthorId(author)
    .then(data => posts = data)
    .catch(err => console.log(err))

  let promiseAllPost  = postModel.selectAllPost()
  let promiseTrash    = postModel.selectAllTrash()
  let promiseDraft    = postModel.selectAllDraft()
  Promise.all([promiseAllPost, promiseTrash, promiseDraft])
    .then(result => {
      postsAll    = result[0].length
      trash       = result[1].length
      draft       = result[2].length
    })

  posts = await Promise.all(posts.map(async (post) => {
    await categoryModel.selectNameCategory(post.category)
      .then(data => { post.category = { id: post.id, name: data[0].name } })
      .catch(err => console.log(err))

    await userModel.selectUserById(post.author)
      .then(data => { post.author = { id: post.author, name: data[0].name } })
      .catch(err => console.log(err))

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
      postsAll,
      postsActive: posts.length,
      trash,
      draft
    }
  })  

})

router.get('/trash', async (req, res) => {
  let trash = null
  await postModel.selectAllTrash()
    .then(data => trash = data)
    .catch(err => console.log(err))

  trash = await Promise.all(trash.map(async (draft) => {
    await categoryModel.selectNameCategory(draft.category)
      .then(data => { draft.category = { id: post.id, name: data[0].name } })
      .catch(err => console.log(err))
    draft.deletedAt = helpers.formatShortDate(draft.deletedAt)
    return draft
  }))

  res.render('admin/post/trash', {
    data: {
      user: helpers.getSessionUser(req),
      trash
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

  const author = req.session.User
  const newPost = {...post}

  newPost.author      = author.id
	newPost.title       = postInput.title
	newPost.category    = postInput.category
  newPost.thumbnail   = null
	newPost.shotDes     = postInput.shotDes
	newPost.content     = postInput.content
	newPost.slug        = helpers.changeToSlug(postInput.title)
	newPost.isActive    = 0
	newPost.isPublish   = postInput.isPublish ? 0 : 1
	newPost.pubishedAt  = postInput.isPublish ? helpers.formatDate() : null
	newPost.createdAt   = helpers.formatDate()
	newPost.tag         = postInput.tag
	newPost.metaTitle   = postInput.metaTitle
	newPost.metaDes     = postInput.metaDes
  
  postModel.insertPost(Object.values(newPost))
    .then(data => {
      res.redirect('/admin/post/list')
    })
    .catch(err => console.log(err))

})

router.get('/category', async (req, res) => {
  let categoryList

  await categoryModel.selectAllCategory()
    .then(data => categoryList = data)
    .catch(err => console.log(err))

  res.render('admin/post/category', {
    data: {
      categoryList
    }
  })
})

router.get('/', async (req, res) => {
  res.redirect('/post/list')
})

module.exports = router
