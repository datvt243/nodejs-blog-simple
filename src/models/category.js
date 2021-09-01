const db = require('../../database/database')

const tableCategories = 'categories'

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

selectAllCategory = () => {
  let query = `SELECT * FROM ${tableCategories} WHERE isActive = ?`
  let values = [0]
  return dbQuery(query, values)
}

selectCategoryIdBySlug = (slug) => {
  let query = `SELECT id FROM ${tableCategories} WHERE slug = ? AND isActive = 0`
  let values = [slug]
  return dbQuery(query, values)
}

selectNameCategory = (id) => {
  let query = `SELECT name FROM ${tableCategories} WHERE id = ? AND isActive = 0`
  let values = [+id]
  return dbQuery(query, values)
}

module.exports = {
  selectAllCategory,
  selectCategoryIdBySlug,
  selectNameCategory
}
