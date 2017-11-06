require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/API', { useMongoClient: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to the database.')
})

let Book = require('./models/bookModel')
var AuthController = require('./controllers/authentication/AuthController')
// var VerifyToken = require('./controllers/authentication/VerifyToken')

let bookRouter = require('./controllers/BookController')(Book)

let app = express()

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false)

  // Pass to next layer of middleware
  next()
})

let port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// app.use('/api', VerifyToken)
app.use('/auth', AuthController)
app.use('/api/books', bookRouter)

app.get('/', (req, res) => {
  res.send('Hi.')
})

app.listen(port, () => {
  console.log('Server running at http://localhost:' + port)
})
