const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post")

require("dotenv");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

exports.create_post = asyncHandler(async (req, res, next) => {
    
  const defaultReturnObject = { authenticated: false, user: null };
  try {

    const token = String(req.headers.authorization.replace("Bearer ", ""));
    
    const decoded = jwt.verify(token, jwtSecret);
    
    
    if (decoded.username != req.body.author) {
        res.status(400).json({message: "Author is not user", fulfilled: false})
        return;
    }

    const newPost = new Post({
        author: req.body.author,
        textContent: req.body.textContent
    });
    await newPost.save();

    const user = await User.find({username: decoded.username}).exec();
    const userRes = await User.updateOne({username: decoded.username}, {$push: {posts: newPost._id}});

    res.status(200).json({ fulfilled: true });
  } catch (err) {
    res.status(400).json({...defaultReturnObject, fulfilled: false});
  }
});
