const express = require('express')
const router = express.Router()

const postModel = require('../models/post')
const userModel = require('../models/user')
const categoryModel = require('../models/category')

const helpers = require('../helpers')

router.get('/', async (req, res) => {

  let posts, nav

  await postModel.getAllPost()
    .then((data) => {
      posts = data
    })
    .catch((err) => console.log(err))
  
  await categoryModel.getAllCategory()
    .then((data) => {
      if (data.length) nav = data
    })
    .catch((err) => console.log(err))

  res.render('index', {
    data: {
      user: helpers.getSessionUser(req),
      posts,
      nav
    }
  })
})

router.get('/post/:slug', async (req, res) => {

  const postSlug = req.params.slug
  let post, author, nav

  await postModel.getPostBySlug(postSlug)
    .then((data) => {
      if (data.length) {
        post = data[0]
      } else {
        res.redirect('/404')
        return
      }
    })
    .catch ((err) => { console.log(err) })

  await userModel.getUserById(+post.author)
    .then(data => {
      if (data.length) {
        author = data[0]
      }
    })
    .catch ((err) => { console.log(err) })

  let tags = ((tags) => {
    if (tags !== null || tags.length) {
      return tags.split(' ')
    } else {
      return false
    }
  })(post.tag)
  
  await categoryModel.getAllCategory()
    .then((data) => {
      if (data.length) nav = data
    })
    .catch((err) => console.log(err))

  post.createdAt = helpers.formatDate02(post.createdAt)
  res.render('post-detail', {
    data: {
      user: helpers.getSessionUser(req),
      nav,
      post,
      author,
      tags
    }
  })

})

router.get('/category/:slug', async (req, res) => {
  const slug = req.params.slug

  let posts, nav, idCategory

  await categoryModel.getCategoryIdBySlug(slug)
    .then((data) => {
      idCategory = data[0].id
    })
    .catch((err) => console.log(err))

  await categoryModel.getAllCategory()
    .then((data) => {
      if (data.length) nav = data
    })
    .catch((err) => console.log(err))

  await postModel.getAllPostByCategoryId(idCategory)
    .then((data) => {
      if (data.length) posts = data
    })
    .catch((err) => console.log(err))

  res.render('category', {
      data: {
        user: helpers.getSessionUser(req),
        title: slug,
        posts,
        nav
      }
    })

})

module.exports = router