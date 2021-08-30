const path = require('path')
const express = require('express')
const router = express.Router()

router.use('/admin', require(path.join(__dirname, '../src/controllers/admin')))
router.use('/about', require(path.join(__dirname, '../src/controllers/about')))
router.use('/register', require(path.join(__dirname, '../src/controllers/register')))
router.use('/user', require(path.join(__dirname, '../src/controllers/user')))
router.use('/api', require(path.join(__dirname, '../src/controllers/api')))

// -----------------------------

router.use('/', require(path.join(__dirname, '../src/controllers/index')))

// router.use('/demo', )

router.get('*', (req, res) => {
  res.render('404')
})

module.exports = router
