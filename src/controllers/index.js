const express         = require('express')
const router          = express.Router()

const postModel       = require('../models/post')
const userModel       = require('../models/user')
const categoryModel   = require('../models/category')

const helpers         = require('../helpers')
const helpersModel    = require('../helpers/model')

// ---------------------------------------------------------------

router.get('/', async (req, res) => {

  let posts

  await postModel.selectAllActive()
    .then((data) => posts = data)
    .catch((err) => console.log(err))
  
  res.render('index', {
    data: {
      user: helpers.getSessionUser(req),
      posts,
      nav: await helpersModel.getAllCategory()
    }
  })

})

/**
 * TODO: 
 */
router.get('/author/:id', (req, res) => {
  res.render('author', {
    data: null
  })
})

/**
 * 
 */
router.get('/post/:slug', async (req, res) => {

  const postSlug = req.params.slug
  let post, author

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

  post = ((post)=> {
    post.tag = ((tags) => {
      if (tags !== null || tags.length) {
        return tags.split(' ')
      } else {
        return false
      }
    })(post.tag)
    post.createdAt = helpers.formatShortDate(post.createdAt)
    return post
  })(post)

  res.render('post-detail', {
    data: {
      user: helpers.getSessionUser(req),
      nav: await helpersModel.getAllCategory(),
      post,
      author
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
      posts = data
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
      nav: await helpersModel.getAllCategory()
    }
  })

})

router.get('/search', async (req, res) => {

  let title = req.query.title
  let results = null
  
  if (title) {
    await postModel.selectSearchByTitle(title)
      .then(data => results = data)
      .catch(err => console.log(err))
    results = await Promise.all(results.map( async (post) => {
      await userModel.selectUserById(post.author)
        .then((data) => {
          post.author = { id: data[0].id, name: data[0].name }
        })
        .catch((err) => console.log(err))
  
      post.createdAt = helpers.formatShortDate(post.createdAt)
      return post
    }))
  }

  res.render('search', {
    data: {
      user: helpers.getSessionUser(req),
      nav: await helpersModel.getAllCategory(),
      query: title,
      results
    }
  })
  
})

module.exports = router
