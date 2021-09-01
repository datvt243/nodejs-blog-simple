const db = require('../../database/database')

const tablePost = 'posts'

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

selectAllPost = () => {
  let query = `SELECT * FROM ${tablePost}`
  let values = []
  return dbQuery(query, values)
}

selectAllTrash = () => {
  let query = `SELECT * FROM ${tablePost} WHERE isActive = 1`
  let values = []
  return dbQuery(query, values)
}

selectAllDraft = () => {
  let query = `SELECT * FROM ${tablePost} WHERE isPublish = 1 AND isActive = 0`
  let values = []
  return dbQuery(query, values)
}

selectAllPostByAuthorId = (author) => {
  let query, values
  if (!author) {
    query = `SELECT * FROM ${tablePost} WHERE isActive = ?`
    values = [0]
  }
  else {
    query = `SELECT * FROM ${tablePost} WHERE isActive = ? AND author = ?`
    values = [0, author]
  }
  return dbQuery(query, values)
}

selectAllPostByCategoryId = (id) => {
  let sorter = `id`
  let query = `SELECT * FROM ${tablePost} WHERE category = ? AND isActive = 0 ORDER BY ` + db.escapeId(sorter, true) + ` DESC`;
  let values = [+id]
  return dbQuery(query, values)
}

selectPostById = (id) => {
  let query = `SELECT * FROM ${tablePost} WHERE id = ?`
  let values = [+id]
  return dbQuery(query, values)
}

selectPostBySlug = (slug) => {
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

updatePostToTrash = (post) => {
  let query = `
    UPDATE ${tablePost} 
    SET isActive = 1, deletedAt = ? 
    WHERE ${tablePost}.id = ?`
  let values = [post.deletedAt, post.id]
  return dbQuery(query, values)
}

updatePostUnTrash = (postId) => {
  let query = `UPDATE ${tablePost} SET isActive = 0 WHERE ${tablePost}.id = ?`
  let values = [+postId]
  return dbQuery(query, values)
}

insertPost = (post) => {
  let query = `INSERT INTO ${tablePost} (id, author, title, category, thumbnail, shotDes, content, slug, isActive, isPublish, pubishedAt, createdAt, updatedAt, deletedAt, tag, metaTitle, metaDes) VALUES ?`
  let values = [[post]]
  return dbQuery(query, values)
}

module.exports = {
  selectAllPost,
  selectAllTrash,
  selectAllDraft,
  selectAllPostByAuthorId,
  selectAllPostByCategoryId,
  selectPostById,
  selectPostBySlug,
  insertPost,
  updatePost,
  updatePostToTrash,
  updatePostUnTrash
}
