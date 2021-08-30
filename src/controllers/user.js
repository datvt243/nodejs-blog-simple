const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
  if (req.session.User) {
    req.session.destroy((err) => {
      console.log(err)
    })
  }
  res.redirect('/')
})

module.exports = router
