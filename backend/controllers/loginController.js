const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
require("dotenv")

const jwtSecret  = process.env.JWT_SECRET;

exports.login_user = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "No user with such email" });
  }

  //Compare passwords with bcrypt.compare method
  //the first password parameter is the one in plain text,
  //and the second user.password is the hashed password

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "The password is incorrect" });
  }

  //generate an access token
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    jwtSecret,
    { expiresIn: "5m" }
  );
  res.header("authorization", accessToken).json({
    error: null,
    data: { accessToken },
  });
});
