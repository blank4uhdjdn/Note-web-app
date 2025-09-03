const User = require("../models/user");
const nodemailer=require("nodemailer")
const Otp=require("../models/otp")
const { generateTokenAndSetCookie } = require("../utils/generateToken");

const handlesignup = async (req, res) => {
  try {
    const { name, dateOfBirth, email } = req.body;

    if (!name || !dateOfBirth || !email) {
      return res.status(400).json({ error: "All fields required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Highway Delite" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Hi ${name},\n\nYour OTP code is ${otp}. It is valid for 5 minutes.\n\n- Highway Delite Team`,
    });
    await Otp.deleteMany({ email });
    await Otp.create({
      email:email,
     generatedOtp:otp
    });

    res.status(200).json({ 
      message: "OTP sent successfully" ,
    });
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};


 const verifyOtp = async (req, res) => {
  try {
    const { name, dateOfBirth, email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ error: "OTP not found" });
    }

    if (otpRecord.generatedOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const user = new User ({ name, dateOfBirth, email });
    if(user){
      generateTokenAndSetCookie(user._id,res)
      await user.save();
    }
    await Otp.deleteMany({ email });

    res.status(200).json({ message: "Signup successful", user });
  } catch (error) {
    console.log(`Error in verifyOtp controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
const handlelogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const checkEmail= await User.findOne({ email }).sort({ createdAt: -1 });

    if (!checkEmail) {
      return res.status(400).json({ error: "No user found " });
    }

    if (!otp) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Highway Delite" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Login OTP",
        text: `Your login OTP is ${generatedOtp}. It is valid for 5 minutes.`,
      });

      await Otp.create({ email, generatedOtp });

      return res.status(200).json({ message: "OTP sent to email" });
    }

    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ error: "OTP not found" });
    }

    if (otpRecord.generatedOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not registered" });
    }

    await Otp.deleteMany({ email });
    const token =generateTokenAndSetCookie(user._id,res)

    res.status(200).json({ message: "Login successful",token, user });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
const handlelogout=async()=>{

}
module.exports={handlesignup,handlelogin,handlelogout,verifyOtp}
