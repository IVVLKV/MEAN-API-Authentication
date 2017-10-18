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
    res.status(200).send('Registration successful')
  })
})

// router.get('/me', (req, res) => {
//   var token = req.headers['x-access-token']
//   if (!token) {
//     return res.status(401).send({ auth: false, message: 'No token provided.' })
//   } else {
//     jwt.verify(token, config.secret, (err, decoded) => {
//       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

//       // res.status(200).send(decoded)

//       User.findById(decoded.id, { password: 0, __v: 0 }, (err, user) => {
//         if (err) return res.status(500).send('There was a problem finding the user.')
//         if (!user) return res.status(404).send('No user found.')
//         res.status(200).send(user)
//       })
//     })
//   }
// })

router.get('/me', VerifyToken, (req, res, next) => {
  User.findById(req.userId, { password: 0, '__v': 0 }, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the user.')
    if (!user) return res.status(404).send('No user found.')
    res.status(200).send(user)
  })
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
    res.status(200).send(JSON.stringify({ auth: true, token: token }))
  })
})

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null })
})

module.exports = router
