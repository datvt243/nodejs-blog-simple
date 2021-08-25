const express = require('express')
const router = express.Router()

router.get('/info', (req, res) => {
  if (req.session.User) {
    return res.status(200).json({status: 'success', session: req.session.User})
  } else {
    res.status(200).json({status: 'error', session: 'No session'})
  }
})

router.get('/logout', (req, res) => {
  if (req.session.User) {
    req.session.destroy((err) => {
      console.log(err)
    })
  }
  res.redirect('/')
})

module.exports = router
