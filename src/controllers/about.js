const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('about', {
    data: null
  })
})

module.exports = router
