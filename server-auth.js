var express = require('express')
var jwt = require('jwt-simple')
var app = express()
var _ = require('lodash')
var bcrypt = require('bcrypt')

var User = require('./user')
app.use(require('body-parser').json())

var users = [{ username: 'dickeyxxx', password: '$2a$10$Jmo/n32ofSM9JvzfH0z6Me6TMyn6C/U9JhzDG8xhQC4ExHMG1jXz2' }]
var secretKey = 'supersecretkey'

app.post('/session', function (req, res) {
    var username = req.body.username
    // TODO: Validate password
    var token = jwt.encode({ username: username }, secretKey)
    res.json(token)
})

/*app.post('/session', function (req, res, next) {
  User.findOne({username: req.body.username}, function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.send(401) }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.send(401) }
      var token = jwt.encode({username: user.username}, secretKey)
      res.json(token)
    })
  })
})*/

app.get('/user', function (req, res) {
  var token = req.headers['x-auth']
  var auth = jwt.decode(token, secretKey)
  User.findOne({username: auth.username}, function (err, user) {
    res.json(user)
  })
})

// create user -testato
app.post('/user', function (req, res, next) {
  var user = new User({username: req.body.username})

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    user.password = hash
    user.save(function (err, user) {
      if (err) { throw next(err) }
      res.sendStatus(201)
    })
  })
})

function findUserByUsername(username) {
    return _.find(users, { username: username })
}

function validateUser(user, password, cb) {
    bcrypt.compare(password, user.password, cb)
}



app.listen(3000)