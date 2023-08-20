const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Refresh = require("../models/refresh");
require("dotenv");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN

exports.signup_create_post = asyncHandler(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.username,
  });
  await user.save();

  const token = jwt.sign({ _id: user._id, username: user.username }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  res.send({ token })

});
