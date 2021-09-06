const express = require('express')
const router = express.Router()
const postModel = require('../models/post')
const categoryModel = require('../models/category')
const userModel = require('../models/user')

const helpers = require('../helpers')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/posts/')
  },
  filename: (req, file, cb) => {
    let title = req.body.title
    let slug = helpers.changeToSlug(title)
    cb(null, slug + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })

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
      enctype: '',
      category: await getCategory(),
      post: post,
      edit: true
    }
  })

});

router.get('/list', async (req, res) => {
  let posts = null
  let postsAll = 0, trash = 0, draft = 0
  let author = req.session.User.userRole ? '' : req.session.User.id
  
  let query = req.query.title || null

  await Promise.all([
      postModel.selectAllActive(author, query),
      postModel.selectAllPost(author), 
      postModel.selectAllTrash(author), 
      postModel.selectAllDraft(author)
    ])
    .then(result => {
      posts       = result[0]
      postsAll    = result[1].length
      trash       = result[2].length
      draft       = result[3].length
    })
    .catch(err => console.log(err))

  posts = await Promise.all(posts.map(async (post) => {
    await Promise
      .all([
        categoryModel.selectNameCategory(post.category),
        userModel.selectUserById(post.author)
      ])
      .then(results => {
        post.category   = { id: post.id, name: results[0][0].name }
        post.author     = { id: post.author, name: results[1][0].name }
      })
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
      draft,
      search: query ? query : ''
    }
  })  

})

router.get('/draft', async (req, res) => {
  let trash = null
  let author = req.session.User.userRole ? '' : req.session.User.id

  let query = req.query.title || null

  await postModel.selectAllDraft(author, query)
    .then(data => trash = data)
    .catch(err => console.log(err))

  trash = await Promise.all(trash.map(async (elm) => {
    await Promise
      .all([
        categoryModel.selectNameCategory(elm.category),
        userModel.selectUserById(elm.author)
      ])
      .then(results => {
        elm.category   = { id: elm.id, name: results[0][0].name }
        elm.author     = { id: elm.author, name: results[1][0].name }
      })
      .catch(err => console.log(err))
    
    elm.deletedAt = helpers.formatShortDate(elm.deletedAt)
    return elm
  }))

  res.render('admin/post/draft', {
    data: {
      user: helpers.getSessionUser(req),
      trash,
      search: query ? query : ''
    }
  })  
})

router.get('/trash', async (req, res) => {
  let trash = null
  let author = req.session.User.userRole ? '' : req.session.User.id

  await postModel.selectAllTrash(author)
    .then(data => trash = data)
    .catch(err => console.log(err))

  trash = await Promise.all(trash.map(async (elm) => {
    await categoryModel.selectNameCategory(elm.category)
      .then(data => { elm.category = { id: post.id, name: data[0].name } })
      .catch(err => console.log(err))
      elm.deletedAt = helpers.formatShortDate(elm.deletedAt)
    return elm
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
      enctype: 'multipart/form-data',
      category: await getCategory(),
      post: post,
      edit: false
    }
  })
})

router.post('/add', upload.single('thumbnail'), (req, res) => {
  let postInput = req.body

  const author = req.session.User
  const newPost = {...post}
  const thumbnail = req.file
  // console.log({thumbnail})

  newPost.author      = author.id
	newPost.title       = postInput.title
	newPost.category    = postInput.category
  newPost.thumbnail   = thumbnail.filename
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
