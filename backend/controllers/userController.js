const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
const post = require("../models/post");

require("dotenv");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

exports.get_user_displayName = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    res.json({ displayName: user.displayName, fulfilled: true });
  } catch (err) {
    res.json({ fulfilled: false });
  }
});

exports.get_user_profile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    res.json({
      username: user.username,
      displayName: user.displayName,
      joinDate: user.joinDate,
      location: user.location,
      posts: user.posts,
      fulfilled: true,
    });
  } catch (err) {
    res.json({ fulfilled: false });
  }
});
