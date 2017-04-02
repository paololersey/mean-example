var router = require('express').Router()
var express = require('express')

router.use(express.static(__dirname + '/../assets'))
router.get('/', function (req, res) {
  res.sendfile('layouts/posts.html')
})

module.exports = router