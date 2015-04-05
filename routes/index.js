var express = require('express');
var router = express.Router();
var LogingUser = '';

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('blog');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "index" : docs
        });
    });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var user = LogingUser;
    var db = req.db;
    var collection = db.get('blog');
    collection.find({"username": LogingUser },{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/editor', function(req, res) {
    var db = req.db;
    var collection = db.get('blog');
    collection.find({},{},function(e,docs){
        res.render('editor', {
            "editor" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


router.post('/adduser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

router.post('/logged', function(req, res){
    // Set our internal DB variable

    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.findOne({'username': userName, 'email': userEmail},function(err, doc){

        if(doc){
            LogingUser = userName;
            res.location("userlist");
            res.redirect("userlist");

        }else{

            res.send("There was a problem adding the information to the database.");

        }
    });

});
router.post('/registrate', function(reg, res){
    res.location("newuser");
    res.redirect("newuser");
});

router.post('/edit', function(reg, res){
    res.location("editor");
    res.redirect("editor");
});

router.post('/postarticle', function(reg, res){

    var db = reg.db;

    // Get our form values. These rely on the "name" attributes
    var title = reg.body.title;
    var content = reg.body.content;
    var username = LogingUser;
    // Set our collection
    var collection = db.get('blog');

    // Submit to the DB
    collection.insert({
        "title" : title,
        "content" : content,
        "username": username
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
