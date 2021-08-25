const express = require('express')
const router = express.Router()

const postModel = require('../models/post')
const userModel = require('../models/user')
const categoryModel = require('../models/category')

const multer  = require('multer')
const upload = multer({ dest: 'public/images/posts/' })

const helpers = require('../helpers')

router.get('/count_trash', async (req, res) => {
  let trash = 0
  await postModel.getAllTrash()
    .then((data) => {
      trash = data.length
    })
    .catch((err) => console.log(err))
  res.json({
    count: trash
  })
})

router.put('/post/edit', (req, res) => {
  let post = req.body
  
  post.updatedAt = helpers.formatDate(post.updatedAt)
  post.slug = helpers.changeToSlug(post.title)

  postModel.updatePost(post)
    .then((data) => {
      res.json({success: true})
    })
    .catch((err) => console.log(err))
})

router.put('/post/delete', (req, res) => {
  let post = req.body
  postModel.trashPost(post.id)
    .then((data) => {
      res.json({success: true})
    })
    .catch((err) => console.log(err))
})

router.put('/post/un-delete', (req, res) => {
  let post = req.body
  postModel.unTrashPost(post.id)
    .then((data) => {
      res.json({success: true})
    })
    .catch((err) => console.log(err))
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
