var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  hash: String,
  salt: String,
  squat: {type: Number, default: 0},
  bench: {type: Number, default: 0},
  barbellrow: {type: Number, default: 0},
  deadlift: {type: Number, default: 0},
  shoulderpress: {type: Number, default: 0},
});

UserSchema.methods.setSquat = function(num, cb){
  this.squat = num;
  this.save(cb);
};

mongoose.model('User', UserSchema);
