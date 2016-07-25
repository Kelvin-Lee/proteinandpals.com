var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
  
  //TODO: Google mongoose `setDefaultOnInsert` option; it describes behavior which might allow us to retroactively update old documents with new fields in the LiftsSchema
  // TODO: Or maybe google 'mongoose data migrations'...? talks about "schema changing" as the app "evolves" and such... this might be more specific to the behavior we want.

  var MAX_LIFT = 500;
  var MIN_LIFT = 0;
  var ERR_MSG_MAX= "Max. lift is " + MAX_LIFT;
  var ERR_MSG_MIN= "Min. lift is " + MIN_LIFT;

  var LiftsSchema= new mongoose.Schema({
    "name": {"type": String}, 
    "value": {"type": Number, "default": 0, "min": [0, ERR_MSG_MIN], "max": [MAX_LIFT, ERR_MSG_MAX]}
  });
  
  LiftsSchema.methods.setLift = function(val, cb){
    this.value = val;
    this.save(cb);
  };

  var UserSchema = new mongoose.Schema({
    "name": {"type": String, "unique": true},
    "hash": String, 
    "salt": String, 
    "lifts": [LiftsSchema]
  });

  UserSchema.methods.setLifts = function(arr, cb){
    console.log("UserSchema.setLifts");
    this.lifts.setLifts(function(o){
      o.save()
    });
    cb();
  }

  UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  };

  UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
  };

  UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      _id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    }, 'SECRET'); // TODO: Tutorial says to change this! "strongly recommended that you use an environment variable"
  };
  
  // If a *new* user is created, then the user gets initiated with all of the below values. However, this does not update old users... yet?
  UserSchema.pre("save", function(next){ //TODO: Similar function for pre("save"..)? 
    console.log("save");
    if (!this.lifts || !Array.isArray(this.lifts) ||this.lifts.length == 0){
      console.log("Overwriting");
      this.lifts = [];
      this.lifts.push(
        {"name": "barbellrow", "value": 0},
        {"name": "bench", "value": 0},
        {"name": "deadlift", "value": 0},
        {"name": "shouldepress", "value": 0},
        {"name": "squat", "value": 0}
      );
    }
    next();
  });

mongoose.model('User', UserSchema);
