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

exports.post_change_profile = asyncHandler(async (req, res, next) => {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req.headers.authorization.replace("Bearer ", ""));
    const decoded = jwt.verify(token, jwtSecret);
    const userId = req.params.id;

    const user = await User.findOne({ username: decoded.username }).exec();
    const newDisplayName = req.body.newDisplayName;
    const newLocation = req.body.newLocation;

    if (
      newDisplayName.length >= 2 &&
      newDisplayName.length <= 20 &&
      newLocation.length <= 24
    ) {
      await User.updateOne(
        { username: decoded.username },
        { displayName: newDisplayName, location: newLocation }
      ).exec();
      res.status(200).json({ fulfilled: true });
    } else {
      res.json({ message: "Invalid display name or location", fulfilled: false });
    }
  } catch (err) {
    res.status(400).json({ ...defaultReturnObject, fulfilled: false });
  }
});
