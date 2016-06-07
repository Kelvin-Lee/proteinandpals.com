var mongoose = require('mongoose');

var MAX_LIFT = 500;
var MIN_LIFT = 0;
var ERR_MSG_MAX= "Max. lift is " + MAX_LIFT;
var ERR_MSG_MIN= "Min. lift is " + MAX_LIFT;

var LiftsSchema= new mongoose.Schema({
  "squat": {"type": Number, "default": 0, "min": [0, ERR_MSG_MIN], "max": [MAX_LIFT, ERR_MSG_MAX]},
  "bench": {"type": Number, "default": 0, "min": [0, ERR_MSG_MIN], "max": [MAX_LIFT, ERR_MSG_MAX]},
  "barbellrow": {"type": Number, "default": 0, "min": [0, ERR_MSG_MIN], "max": [MAX_LIFT, ERR_MSG_MAX]},
  "deadlift": {"type": Number, "default": 0, "min": [0, ERR_MSG_MIN], "max": [MAX_LIFT, ERR_MSG_MAX]},
  "shoulderpress": {"type": Number, "default": 0, "min": [0, ERR_MSG_MIN], "max": [MAX_LIFT, ERR_MSG_MAX]}
});

var ExerciseSchema = new mongoose.Schema({
  // Non lifting exercises?
});

var UserSchema = new mongoose.Schema({
  "name": {"type": String, "unique": true},
  "hash": String, // does nothing yet
  "salt": String, // does nothing yet
  "lifts": {"type": LiftsSchema, "default": LiftsSchema}
//"exercises": {"type": ExerciseSchema, "default": ExerciseSchema}  
});

mongoose.model('User', UserSchema);
