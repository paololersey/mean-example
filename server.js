var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


var Post = require('./models/post')
//require('./controllers/api/posts')(app)
app.use(require('./controllers/api/posts'))
//app.use('api/posts', require('./controllers/api/posts')) // doesn't work
app.use( require('./controllers/static'))
// equivalent to: app.use('/', require('./controllers/static'))

app.listen(3002, function () {
    console.log('Server listening on', 3002)
})
