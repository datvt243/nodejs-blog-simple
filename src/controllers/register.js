const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const helpers = require('../helpers')

router.get('/login', (req, res) => {
  if (req.session.User) {
    res.redirect('/')
    return
  }
  res.render('register/login' , { 
    data: {
      user: { email: 'votan.it@gmail.com', password: 'admin' }
    }
  })
})

router.post('/login', (req, res) => {
  const params = req.body
  
  let flag = true
  let error = ''
  let userLogin
  
  [flag, error, userLogin] = ((flag, error) => {
    let userInput = { email: '', password: '' }
    if(!params.email.trim()) {
      error += `<li><bold>Email</bold> chưa được nhập</li>`
      flag = false
    } else userInput.email = params.email.trim()
    if(!params.password.trim()) {
      error += `<li><bold>Password</bold> chưa được nhập</li>`
      flag = false
    } else userInput.password = ''

    return [flag, error, userInput]

  })(flag, error)

  if (!flag) {
    res.render('register/login', {
      data: {
        error, 
        user: userLogin
      }
    })
  } else {
    userModel.getUser(userLogin)
      .then((data) => {
        if (data.length) {
          let user = data[0]
          let comparePwd = helpers.comparePassword(params.password, user.password)
          if (comparePwd) {
            req.session.User = user
            res.redirect('/')
          } else {
            res.render('register/login', {
              data: { error: "<li>Đăng nhập thất bại</li>", user : { email: '', password: '' } }
            })
          }
        } else {
          res.render('register/login', {
            data: { error: "<li>Tài khoản không tồn tại</li>", user : { email: '', password: '' } }
          })
        }
        
      })
      .catch((err) => {
        res.render('register/login', {
          data: {
            error: err, user: { email: '', password: '' }
          }
        })
      })
  }

})

router.get('/signup', (req, res) => {
  res.render('register/signup', 
    { 
      data: {
        user: { name: '', email: '', password: '' }
      }
    }
  )
})

router.post('/signup', (req, res) => {
  const user = req.body

  let flag = true
  let error = ''
  let userRegister

  [flag, error, userRegister] = ((flag, error) => {
    let userInput = { name: '', email: '', password: '' }
    if(!user.name.trim()) {
      error += `<li><bold>Họ tên</bold> chưa được nhập</li>`
      flag = false
    } else userInput.name = user.name.trim()
    if(!user.email.trim().length) {
      error += `<li><bold>Email</bold> chưa được nhập</li>`
      flag = false
    } else userInput.email = user.email.trim()
    if(!user.password.trim().length) {
      error += `<li><bold>Password</bold> chưa được nhập</li>`
      flag = false
    } else userInput.password = ''
    if(user.password.trim().length && user.password != user.re_password) {
      error += `<li><bold>Password nhập lại</bold> không khớp</li>`
      flag = false
    }

    return [flag, error, userInput]

  })(flag, error)

  if (!flag) {
    res.render('register/signup', {
      data: {
        error, 
        user: userRegister
      }
    })
  } else {
    userRegister.password = helpers.hashPassword(user.password)
    userRegister.createdAt = helpers.formatDate()
    userModel.addUser(userRegister)
      .then((result) => {
        res.render('register/messages', {
          data: {
            messages: `
              <h1>Chúc mừng,</h1>
              <p>Tài khoản của bạn đã được tạo thành công. <a href='login'">Đăng nhập</a> ngay</p>
            `
          }
        })
      })
      .catch((err) => {
        res.json({"Error": err})
      })
  }

})

module.exports = router
