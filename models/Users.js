var mongoose = require('mongoose');

var MAX_LIFT = 500;
var MIN_LIFT = 0;

var LiftsSchema= new mongoose.Schema({
  "squat": {"type": Number, "default": 0, "min": [0, "err: min. lift is " + MIN_LIFT], "max": [MAX_LIFT, "err: max lift is" + MAX_LIFT]},
  "bench": {"type": Number, "default": 0, "min": [0, "err: min. lift is " + MIN_LIFT], "max": [MAX_LIFT, "err: max lift is" + MAX_LIFT]},
  "barbellrow": {"type": Number, "default": 0, "min": [0, "err: min. lift is " + MIN_LIFT], "max": [MAX_LIFT, "err: max lift is" + MAX_LIFT]},
  "deadlift": {"type": Number, "default": 0, "min": [0, "err: min. lift is " + MIN_LIFT], "max": [MAX_LIFT, "err: max lift is" + MAX_LIFT]},
  "shoulderpress": {"type": Number, "default": 0, "min": [0, "err: min. lift is " + MIN_LIFT], "max": [MAX_LIFT, "err: max lift is" + MAX_LIFT]}
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
