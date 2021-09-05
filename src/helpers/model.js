const categoryModel = require('../models/category')

let helpersModel = {}

helpersModel.getAllCategory = async () => {
  let nav
  await categoryModel.selectAllCategory()
    .then(data => nav = data)
    .catch(err => console.log(err))
  return nav
}

module.exports = helpersModel
