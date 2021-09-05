const db = require('../../database/database')

const tableCategories = 'categories'
let categoryModel = {}

const dbQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(query, values, (err, results) => {
        if (err) return reject(err)
        return resolve(results)
      })
    } catch (err) { console.log(err) }
  })
}

categoryModel.selectAllCategory = () => {
  let query = `SELECT * FROM ${tableCategories} WHERE isActive = ?`
  let values = [0]
  return dbQuery(query, values)
}

categoryModel.selectCategoryIdBySlug = (slug) => {
  let query = `SELECT id FROM ${tableCategories} WHERE slug = ? AND isActive = 0`
  let values = [slug]
  return dbQuery(query, values)
}

categoryModel.selectNameCategory = (id) => {
  let query = `SELECT name FROM ${tableCategories} WHERE id = ? AND isActive = 0`
  let values = [+id]
  return dbQuery(query, values)
}

module.exports = categoryModel
