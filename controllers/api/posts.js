'use strict';

var Post = require('../../models/post')
var router = require('express').Router()

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'paolospadoni1980@gmail.com',
        pass: 'kersey11'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'paolospadoni1980@gmail.com', // sender address
    to: 'paolospadoni1980@gmail.com', // list of receivers
    subject: 'Insert post ', // Subject line
    text: "I'm adding a post", // plain text body
    html: "<b>I'm adding a post</b>" // html body
};




router.get('/api/posts', function (req, res, next) {
	/*var post = new Post({
        username: "pippo",
        body: "pluto"
    })
	var posts= new Array();
	posts.push(post);
	res.json(posts);*/
	
    Post.find()
        .sort('-date')
        .exec(function (err, posts) {
            if (err) {
                return next(err)
            }
			console.log("posts="+posts)
            res.json(posts)
        })
		
})

router.post('/api/posts', function (req, res, next) {
    console.log(req);
    var post = new Post({
        username: req.body.username,
        body: req.body.body
    })
	//console.log('mailOptions = ', mailOptions.from);
	// send mail with defined transport object
	/*transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
	});*/
	//res.json(200, post)
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
    var money=Number(text.substring(text.indexOf('$:')+2,text.indexOf('ICE')));
   
    var ice=Number(text.substring(text.indexOf('ICE')+4,text.indexOf('Kg')));
    var bag=text.substring(text.indexOf('BAG')+4,text.indexOf('CHG'));
    var chg=Number(text.substring(text.indexOf('CHG')+4,text.indexOf('CHG')+8));
    var date=text.substring(text.length-19,text.length-3);
    console.log("money="+money+",ice="+ice+Number(1)+",bag="+bag+",chg="+chg+",date="+date)  
    res.json(200,text)
})



module.exports = router