const express = require('express')
const router = express.Router()
const postModel = require('../models/post')
const categoryModel = require('../models/category')

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

router.get('/edit/:id', async (req, res) => {
  const postId = req.params.id

  let category
  await categoryModel.getAllCategory()
    .then((data) => {
      category = data
    })
  
  postModel.getPostById(+postId)
    .then((data) => {
      let post = data[0]
      post.createdAt = helpers.formatDate(post.createdAt)
      post.pubishedAt = helpers.formatDate(post.pubishedAt)
      if (post.updatedAt !== null || post.updatedAt !== '') {
        post.updatedAt = helpers.formatDate(post.updatedAt)
      }
      res.render('admin/post/add', {
        data: {
          user: helpers.getSessionUser(req),
          err: false,
          method: '',
          action: '',
          category: category,
          post: post,
          edit: true
        }
      })
    }).catch((err) => {
      console.log("ERR: ", err)
      res.redirect('/404')
    })
});

router.get('/list', async (req, res) => {
  let post = null
  let trash = 0

  await postModel.getAllPost()
    .then((data) => {
      post = data  
    }).catch((err) => {
      console.log(err)
    })

  await postModel.getAllTrash()
    .then((data) => {
      trash = data.length
    })

  res.render('admin/post/list', {
    data: {
      user: helpers.getSessionUser(req),
      post,
      trash
    }
  })  

})

router.get('/trash', async (req, res) => {
  let trash = null
  await postModel.getAllTrash()
    .then((data) => {
      trash = data
    })

  res.render('admin/post/trash', {
    data: {
      user: helpers.getSessionUser(req),
      post: trash
    }
  })  
})

router.get('/add', async (req, res) => {
  let category
  await categoryModel.getAllCategory()
    .then((data) => {
      category = data
    })
  res.render('admin/post/add', {
    data: {
      user: helpers.getSessionUser(req),
      err: false,
      method: 'POST',
      action: '/admin/post/add',
      category: category,
      post: post,
      edit: false
    }
  })
})

router.post('/add', async (req, res) => {
  let postInput = req.body

  const newPost = {...post}

  newPost.author      = 27
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

  let category
  await categoryModel.getAllCategory()
    .then((data) => {
      category = data
    })

  postModel.addNewPost(Object.values(newPost))
    .then((data) => {
      res.redirect('/admin/post')
    }).catch((err) => {
      console.log('Error: ', err)
    })

})

router.get('/', async (req, res) => {
  res.redirect('/post/list')
})


module.exports = router
