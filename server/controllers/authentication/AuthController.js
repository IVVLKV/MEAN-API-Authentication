let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

let User = require('../../models/userModel')

let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
let config = require('../../config')
var VerifyToken = require('./VerifyToken')

router.post('/register', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8)
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  },
  (err, user) => {
    if (err) return res.status(500).send('There was a problem registering the user.')
    // create a token
    // var token = jwt.sign({ id: user._id }, config.secret, {
    //   expiresIn: 86400 // expires in 24 hours
    // })
    res.status(200).send(JSON.stringify({ reg: true, user: user.name }))
  })
})

router.get('/user-status', VerifyToken, (req, res) => {
  let content = {
    success: true,
    status: 'Verified'
  }
  res.status(200).send(content)
})

router.use(function (user, req, res, next) {
  res.status(200).send(user)
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send(JSON.stringify({ auth: true, token: token, user: user.name }))
  })
})

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null })
})

module.exports = router
