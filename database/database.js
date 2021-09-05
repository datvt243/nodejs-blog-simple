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

/*
The Result Object
When executing a query, a result object is returned.
The result object contains information about how the query affected the table.
The result object returned from the example above looks like this:
{
  fieldCount: 0,
  affectedRows: 14,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '\'Records:14  Duplicated: 0  Warnings: 0',
  protocol41: true,
  changedRows: 0
}   

INSERT - results.insertId
DELETE - results.affectedRows
UPDATE - results.changedRows

*/