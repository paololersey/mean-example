var Post = require('../../models/post')
var router = require('express').Router()

router.get('/api/posts', function (req, res, next) {
    Post.find()
        .sort('-date')
        .exec(function (err, posts) {
            if (err) {
                return next(err)
            }
            res.json(posts)
        })
})

router.post('/api/posts', function (req, res, next) {
    console.log(req);
    var post = new Post({
        username: req.body.username,
        body: req.body.body
    })
    post.save(function (err, post) {
        if (err) {
            return next(err)
        }
        res.json(200, post)
    })
})

router.post('/api/restGet', function (req, res, next) {
    console.log(req.body, req.url);
    var receiver=req.body.receiver;
    var text=req.body.text;
    console.log("receiver= "+receiver)
    console.log("text="+text)  
    res.json(200, req.body)
})



module.exports = router