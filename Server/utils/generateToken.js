const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set token in cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict", // Helps prevent CSRF attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};

module.exports = generateToken;
