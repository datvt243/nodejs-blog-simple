require('dotenv').config()
const mysql = require('mysql')

const mysqlHost   = process.env.MYSQL_HOST || 'localhost'
const mysqlUser   = process.env.MYSQL_USER || 'root'
const mysqlPwd    = process.env.MYSQL_PWD || ''
const mysqlDB     = process.env.MYSQL_DB  || 'demo'

const connection = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPwd,
  database: mysqlDB
})

connection.connect((err) => {
  if (err) {
    console.log('Connect failed !!!', err)
  } else {
    console.log('Connected successfully !!!')
  }
})

module.exports = connection
