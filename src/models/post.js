const db = require('../../database/database')

const tablePost = 'posts'
let postModel = {}

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

postModel.selectAllPost = (author) => {
  let query = `SELECT * FROM ${tablePost}`
  let values = []
  if (author) {
    query += ` WHERE author = ?`
    values.push(author)
  }
  return dbQuery(query, values)
}

postModel.selectAllTrash = (author) => {
  let query = `SELECT * FROM ${tablePost} WHERE isActive = 1`
  let values = []
  if (author) {
    query += ` AND author = ?`
    values.push(author)
  }
  return dbQuery(query, values)
}

postModel.selectAllDraft = (author, search = null) => {
  let querySELECT   = `SELECT *`
  let queryFROM     = `FROM ${tablePost}`
  let queryWHERE    = `WHERE isPublish = 1 AND isActive = 0`
  let values        = []
  if (author) {
    queryWHERE += ` AND author = ?`
    values.push(author)
  }
  if (search) {
    queryWHERE += ` AND title LIKE ? `
    values.push(`%${search}%`)
  }
  return dbQuery(`${querySELECT} ${queryFROM} ${queryWHERE}`, values)
}

postModel.selectAllActive = (author, search = null) => {
  let sorter        = `id`
  let querySELECT   = `SELECT *`
  let queryFROM     = `FROM ${tablePost}`
  let queryWHERE    = `WHERE isActive = 0 AND isPublish = 0`
  let queryORDER    = ` ORDER BY ` + db.escapeId(sorter, true) + ` DESC`
  let values        = []

  if (author) {
    queryWHERE += ` AND author = ?`
    values.push(author)
  }
  if (search) {
    queryWHERE += ` AND title LIKE ? `
    values.push(`%${search}%`)
  }
 
  return dbQuery(`${querySELECT} ${queryFROM} ${queryWHERE} ${queryORDER}`, values)
}

postModel.selectAllPostByCategoryId = (id) => {
  let sorter = `id`
  let query = `SELECT * FROM ${tablePost} WHERE category = ? AND isActive = 0 ORDER BY ` + db.escapeId(sorter, true) + ` DESC`
  let values = [+id]
  return dbQuery(query, values)
}

postModel.selectPostById = (id) => {
  let query = `SELECT * FROM ${tablePost} WHERE id = ?`
  let values = [+id]
  return dbQuery(query, values)
}

postModel.selectPostBySlug = (slug) => {
  let query = `SELECT * FROM ${tablePost} WHERE slug = ?`
  let values = [slug+'']
  return dbQuery(query, values)
}

postModel.updatePost = (post) => {
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

postModel.updatePostToTrash = (post) => {
  let query = `
    UPDATE ${tablePost} 
    SET isActive = 1, deletedAt = ? 
    WHERE ${tablePost}.id = ?`
  let values = [post.deletedAt, post.id]
  return dbQuery(query, values)
}

postModel.updatePostUnTrash = (postId) => {
  let query = `UPDATE ${tablePost} SET isActive = 0 WHERE ${tablePost}.id = ?`
  let values = [+postId]
  return dbQuery(query, values)
}

postModel.insertPost = (post) => {
  let query = `INSERT INTO ${tablePost} (id, author, title, category, thumbnail, shotDes, content, slug, isActive, isPublish, pubishedAt, createdAt, updatedAt, deletedAt, tag, metaTitle, metaDes) VALUES ?`
  let values = [[post]]
  return dbQuery(query, values)
}

postModel.selectSearchByTitle = (title) => {
  let sorter = `createdAt`
  let query = `SELECT * FROM ${tablePost} WHERE title LIKE ? AND isActive = 0 AND isPublish = 0 ORDER BY ` + db.escapeId(sorter, true) + ` DESC`
  let values = [`%${title}%`]
  return dbQuery(query, values)
}

postModel.selectSearchByTag = (tag) => {
  let sorter = `createdAt`
  let query = `SELECT * FROM ${tablePost} WHERE tag LIKE ? AND isActive = 0 AND isPublish = 0 ORDER BY ` + db.escapeId(sorter, true) + ` DESC`
  let values = [`%${tag}%`]
  return dbQuery(query, values)
}

module.exports = postModel
