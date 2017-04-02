var Post = require('../../models/post')
var router = require('express').Router()

router.get('/api/posts', function (req, res, next) {
    Post.find()
        .sort('-date')
        .exec(function (err, posts) {
            if (err) { return next(err) }
            res.json(posts)
        })
})

router.post('/api/posts', function (req, res, next) {
    console.log(req);
    var post = new Post({
        username: req.body.username,
        body: req.body.body
    })
    console.log("ciao");
    post.save(function (err, post) {
        if (err) { return next(err) }
        res.json(201, post)
    })
})

module.exports = router