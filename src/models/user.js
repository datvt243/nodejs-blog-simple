const db = require('../../database/database')

const tableUser = 'users'
let userModel = {}

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

userModel.insertUser = (user) => {
  let query = `INSERT INTO ${tableUser} (name, email, password, createdAt) VALUES (?)`
  let values = [[user.name, user.email, user.password, user.createdAt]]
  return dbQuery(query, values)
}

userModel.selectAllUsers = () => {
  let query = `SELECT * FROM ${tableUser}`
  let values = []
  return dbQuery(query, values)
}

userModel.selectUserByEmail = (user) => {
  let query = `SELECT * FROM ${tableUser} WHERE email = ?`
  let values = [user.email]
  return dbQuery(query, values)
}

userModel.selectUserById = (id) => {
  let query = `SELECT * FROM ${tableUser} WHERE id = ?`
  let values = [+id]
  return dbQuery(query, values)
}

userModel.selectNameUser = (id) => {
  let query = `SELECT name FROM ${tableUser} WHERE id = ?`
  let values = [+id]
  return dbQuery(query, values)
}

module.exports = userModel
