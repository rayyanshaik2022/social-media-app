const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Refresh = require("../model/refresh");
require("dotenv");
const crypto = require("crypto");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

exports.login_user = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "No user with such email" });
  }

  //Compare passwords with bcrypt.compare method
  //   //the first password parameter is the one in plain text,
  //   //and the second user.password is the hashed password

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "The password is incorrect" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
});
