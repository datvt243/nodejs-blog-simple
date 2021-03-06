const express = require('express')
const router = express.Router()

const postModel = require('../models/post')
const userModel = require('../models/user')
const categoryModel = require('../models/category')

const multer  = require('multer')
const upload = multer({ dest: 'public/images/posts/' })

const helpers = require('../helpers')

router.get('/count_post_all', async (req, res) => {
  let trash = 0
  let author = req.session.User.userRole ? '' : req.session.User.id
  await postModel.selectAllPost(author)
    .then((data) => trash = data.length)
    .catch((err) => console.log(err))
  res.json({count: trash})
})
router.get('/count_post_active', async (req, res) => {
  let trash = 0
  let author = req.session.User.userRole ? '' : req.session.User.id
  await postModel.selectAllActive(author)
    .then((data) => trash = data.length)
    .catch((err) => console.log(err))
  res.json({count: trash})
})
router.get('/count_post_trash', async (req, res) => {
  let trash = 0
  let author = req.session.User.userRole ? '' : req.session.User.id
  await postModel.selectAllTrash(author)
    .then((data) => trash = data.length)
    .catch((err) => console.log(err))
  res.json({count: trash})
})
router.get('/count_post_draft', async (req, res) => {
  let trash = 0
  let author = req.session.User.userRole ? '' : req.session.User.id
  await postModel.selectAllDraft(author)
    .then((data) => trash = data.length)
    .catch((err) => console.log(err))
  res.json({count: trash})
})

router.put('/post/edit', async (req, res) => {
  let post = req.body
  let success = false
  
  post.updatedAt = helpers.formatDate(post.updatedAt)
  post.slug = helpers.changeToSlug(post.title)

  await postModel.updatePost(post)
    .then((data) => success = true)
    .catch((err) => console.log(err))

  res.json({success})
})

router.put('/post/delete', async (req, res) => {
  let post = req.body
  let success = false

  post.deletedAt = helpers.formatDate()
  await postModel.updatePostToTrash(post)
    .then((data) => success = true)
    .catch((err) => console.log(err))

  res.json({success})
})

router.put('/post/un-delete', async (req, res) => {
  let post = req.body
  let success = false
  await postModel.updatePostUnTrash(post.id)
    .then((data) => success = true)
    .catch((err) => console.log(err))
  res.json({success})
})

router.put('/user/edit', upload.single('req.body.avatar'), (req, res) => {
  let user = req.body
  console.log('---------')
  console.log(req.file)
  console.log(req.body)
  res.json({
    user
  })
})

module.exports = router
