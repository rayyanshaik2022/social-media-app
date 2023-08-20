const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  Refresh = require('../model/refresh');
require("dotenv")

const jwtSecret  = process.env.JWT_SECRET;

exports.signup_create_post = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.username,
  });

  await user.save();
  console.log("user created!");
  res.json({ response: "sent!" });
});
