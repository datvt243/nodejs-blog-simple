require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router')

const app = express()

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// session
app.set('trust proxy', 1) // trust first proxy
const hour = 3600000
app.use(session ({
  secret: 'somesecret',
  resave: true,
  saveUninitialized: true,
  cookie: { 
    path: '/', httpOnly: true, secure: false, maxAge: null
  }
}))

// set public file
app.use(express.static(path.join(__dirname, 'public')))

// set engine template
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))

// set route
app.use(router)

const port = 3000
app.listen(port, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})