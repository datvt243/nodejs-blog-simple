const path = require('path')
const express = require('express')
const router = express.Router()

const multer  = require('multer')
const upload = multer({ dest: 'public/images/posts/' })

const userModel = require('../models/user')

const helpers = require('../helpers')

router.use((req, res, next) => {
  if (req.session.User) {
    next()
  } else {
    res.redirect('/register/login')
  }
})

router.use('/post', require(path.join(__dirname, '../../src/controllers/admin.post.js')))
router.use('/user', require(path.join(__dirname, '../../src/controllers/admin.user.js')))

router.get('/config', async (req, res) => {
  const sessionUser = req.session.User
  let idUser = sessionUser.id
  let userConfig

  await userModel.getUserById(idUser)
    .then((data) => {
      if (data.length) userConfig = data[0]
      else {
        res.redirect('/404')
        return
      }
    })
    .catch((err) => console.log(err))

  userConfig.createdAt = helpers.formatDate02(userConfig.createdAt)
  userConfig.sex = userConfig.sex ? true : false
  res.render('admin/config', {
    data: {
      user: helpers.getSessionUser(req),
      userConfig
    }
  })
})

router.post('/config', upload.single('avatar'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.json({
    file: req.file,
    body: req.body,
  })
})

router.get('/', (req, res) => {
  res.render('admin/index', {
    data: {
      user: helpers.getSessionUser(req)
    }
  })
})

module.exports = router
