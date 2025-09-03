const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // secure only in production
  });

  return token; // ✅ return the token
};

module.exports = {
  generateTokenAndSetCookie,
};
