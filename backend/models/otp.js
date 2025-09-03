const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
  email:{
    type: String,
    unique:true
  },
  
    generatedOtp: {
      type: String,
      required: true,
    }
   
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", userSchema);

module.exports = Otp;
