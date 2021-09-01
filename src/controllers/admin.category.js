const express = require('express')
const router = express.Router()

const categoryModel = require('../models/category')

const helpers = require('../helpers')

router.get('/list', async (req, res) => {
  let categoryList

  await categoryModel.selectAllCategory()
    .then((data) => categoryList = data)
    .catch((err) => console.log(err))

  categoryList = categoryList.map((category) => {
    category.isActive = !category.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'
    return category
  })
  res.render('admin/category/list', {
    data: {
      categoryList,
      user: helpers.getSessionUser(req)
    }
  })
})

router.get('/', async (req, res) => {
  res.redirect('/list')
})

module.exports = router
