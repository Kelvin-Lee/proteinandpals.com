var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("EventA. router.get('/',...");
  res.render('index', { title: 'Express' });
});

router.get('/users/:user', function(req, res, next){ //Render user.html
  console.log("EventZ. router.get('/users/:user'...)");
  res.send(req.user);
});

router.get('/users', function(req, res, next){ //Getting all users
  console.log("EventX. router.get('/users'...");
  return User.find(function(err, users){
    if (err) { return next(err); }
    res.json(users);
  });
});

router.post('/users', function(req, res, next){ // Saving a new user
  console.log("EventW. router.post('/users'...");
  var user = new User(req.body);
  user.save(function(err, user){
    if (err) { return next(err); }
    res.json(user);
  });
});

router.param('user', function(req, res, next, id){ //each time the :user param is found in a route, this will run first...
  console.log("EventY. router.param('user'...)");
  var query = User.findById(id);
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error("can't find user")); }
    req.user = user;
    return next();
  })
});

module.exports = router;
