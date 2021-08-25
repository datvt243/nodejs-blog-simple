const db = require('../../database/database')

const tablePost = 'posts'

const dbQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(query, values, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    } catch (err) { console.log(err) }
  })
}

getAllPost = () => {
  let query = `SELECT * FROM ${tablePost} WHERE isActive = ?`
  let values = [0]
  return dbQuery(query, values)
}

getAllPostByCategoryId = (id) => {
  let query = `SELECT * FROM ${tablePost} WHERE category = ? AND isActive = 0`
  let values = [+id]
  return dbQuery(query, values)
}

getAllTrash = (val = 1) => {
  let query = `SELECT * FROM ${tablePost} WHERE isActive = ?`
  let values = [val]
  return dbQuery(query, values)
}

getPostById = (id) => {
  let query = `SELECT * FROM ${tablePost} WHERE id = ?`
  let values = [+id]
  return dbQuery(query, values)
}

getPostBySlug = (slug) => {
  let query = `SELECT * FROM ${tablePost} WHERE slug = ?`
  let values = [slug+'']
  return dbQuery(query, values)
}

updatePost = (post) => {
  let query = `
    UPDATE ${tablePost} 
    SET title = ?, category = ?, shotDes = ?, content = ?, slug = ?, isPublish = ?, updatedAt = ?, tag = ?, metaTitle = ?, metaDes = ? 
    WHERE ${tablePost}.id = ?`
  let values = [
    post.title,
    post.category,
    post.shotDes,
    post.content,
    post.slug,
    post.isPublish,
    post.updatedAt,
    post.tag,
    post.metaTitle,
    post.metaDes,
    post.id
  ]
  return dbQuery(query, values)
}

trashPost = (postId) => {
  let query = `UPDATE ${tablePost} SET isActive = 1 WHERE ${tablePost}.id = ?`
  let values = [+postId]
  return dbQuery(query, values)
}

unTrashPost = (postId) => {
  let query = `UPDATE ${tablePost} SET isActive = 0 WHERE ${tablePost}.id = ?`
  let values = [+postId]
  return dbQuery(query, values)
}

addNewPost = (post) => {
  let query = `INSERT INTO ${tablePost} (id, author, title, category, thumbnail, shotDes, content, slug, isActive, isPublish, pubishedAt, createdAt, updatedAt, deletedAt, tag, metaTitle, metaDes) VALUES ?`
  let values = [[post]]
  return dbQuery(query, values)
}

module.exports = {
  getAllPost,
  getAllTrash,
  getPostById,
  getPostBySlug,
  addNewPost,
  updatePost,
  trashPost,
  unTrashPost,
  getAllPostByCategoryId
}