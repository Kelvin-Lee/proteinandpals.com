var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("EventA. router.get('/',...");
  res.render('index', { title: 'Express' });
});

router.put('/users/:user', function (req, res, next){
  console.log("EventK. router.put('/users/:user'");
  User.findByIdAndUpdate(req.user._id, { $set: {lifts: req.body}}, function(err, user){
    if(err){return;} //TODO: actual error handler
    res.send(user); //TODO: see if we really need to res.send the user
  });
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

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({"message": 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err){
    if(err){return next(err);}
    return res.json({"token": user.generateJWT()})
  });
});

router.post('login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({"message": 'Please fill out all fields'});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err)}
    if(user){
      return res.json({"token": user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
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
