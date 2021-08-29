const express = require('express')
const router = express.Router()

const userModel = require('../models/user')

const helpers = require('../helpers')

router.get('/info/:id', async (req, res) => {
  let userId = req.params.id
  let userInfo

  await userModel.getUserById(+userId)
    .then((data) => {
      userInfo = data[0]
    })
    .catch((err) => console.log(err))

  res.render('admin/user/info', {
    data: {
      user: helpers.getSessionUser(req),
      userInfo
    }
  })

})

router.get('/list', async (req, res) => {
  let users = null

  await userModel.getAllUsers()
    .then((data) => {
      users = data  
    }).catch((err) => {
      console.log(err)
    })

  users = users.map((user) => {
    user.lastLogin = user.lastLogin ? helpers.formatShortDate(user.lastLogin) : user.lastLogin
    return user
  })

  res.render('admin/user/list', {
    data: {
      user: helpers.getSessionUser(req),
      users
    }
  })  
})

module.exports = router
