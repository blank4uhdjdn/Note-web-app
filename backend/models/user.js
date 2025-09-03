const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth:{
    type:String,
    requiered:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
  },
  
}, {
  timestamps: true
});
const User=mongoose.model('User', UserSchema);

module.exports = User