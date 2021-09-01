const express = require('express')
const router = express.Router()

const postModel = require('../models/post')
const userModel = require('../models/user')
const categoryModel = require('../models/category')

const helpers = require('../helpers')

const getNavCategory = async () => {
  let nav
  await categoryModel.selectAllCategory()
    .then((data) => nav = data)
    .catch((err) => console.log(err))
  return nav
}

router.get('/', async (req, res) => {

  let posts, nav

  await postModel.selectAllPostByAuthorId()
    .then((data) => posts = data)
    .catch((err) => console.log(err))
  
  await categoryModel.selectAllCategory()
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

router.get('/author/:id', (req, res) => {
  res.render('author', {
    data: null
  })
})

router.get('/post/:slug', async (req, res) => {

  const postSlug = req.params.slug
  let post, author, nav

  await postModel.selectPostBySlug(postSlug)
    .then((data) => {
      if (data.length) {
        post = data[0]
      } else {
        res.redirect('/404')
        return
      }
    })
    .catch ((err) => console.log(err))

  await userModel.selectUserById(+post.author)
    .then(data => author = data[0])
    .catch ((err) => console.log(err))

  let tags = ((tags) => {
    if (tags !== null || tags.length) {
      return tags.split(' ')
    } else {
      return false
    }
  })(post.tag)
  
  await categoryModel.selectAllCategory()
    .then((data) => {
      if (data.length) nav = data
    })
    .catch((err) => console.log(err))

  post.createdAt = helpers.formatShortDate(post.createdAt)
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

  let posts, idCategory

  await categoryModel.selectCategoryIdBySlug(slug)
    .then((data) => {
      idCategory = data[0].id
    })
    .catch((err) => console.log(err))

  await postModel.selectAllPostByCategoryId(idCategory)
    .then((data) => {
      if (data.length) posts = data
    })
    .catch((err) => console.log(err))

  posts = await Promise.all(posts.map( async (post) => {
    await userModel.selectUserById(post.author)
      .then((data) => {
        post.author = { id: data[0].id, name: data[0].name }
      })
      .catch((err) => console.log(err))

    post.createdAt = helpers.formatShortDate(post.createdAt)
    return post
  }))
  
  res.render('category', {
    data: {
      user: helpers.getSessionUser(req),
      title: slug,
      posts,
      nav: await getNavCategory()
    }
  })

})

module.exports = router
