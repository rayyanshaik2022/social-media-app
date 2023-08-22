const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
const post = require("../models/post");

require("dotenv");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

exports.create_post = asyncHandler(async (req, res, next) => {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req.headers.authorization.replace("Bearer ", ""));

    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.username != req.body.author) {
      res.status(400).json({ message: "Author is not user", fulfilled: false });
      return;
    }

    const newPost = new Post({
      author: req.body.author,
      authorId: req.body.authorId,
      textContent: req.body.textContent,
    });
    await newPost.save();

    const user = await User.find({ username: decoded.username }).exec();
    const userRes = await User.updateOne(
      { username: decoded.username },
      { $push: { posts: newPost._id } }
    );

    const postList = await Post.find({}).sort({ datePosted: -1 }).limit(100);

    res.status(200).json({ fulfilled: true, posts: postList });
  } catch (err) {
    res.status(400).json({ ...defaultReturnObject, fulfilled: false });
  }
});

exports.get_posts = asyncHandler(async (req, res, next) => {
  const postList = await Post.find({}).sort({ datePosted: -1 }).limit(20);
  res.json({ posts: postList, fulfilled: true });
});

exports.get_single_post = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json({ post: post, fulfilled: true });
  } catch (err) {
    res.json({ message: "Failed to get message", fulfilled: false });
  }
});

exports.delete_single_post = asyncHandler(async (req, res, next) => {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req.headers.authorization.replace("Bearer ", ""));

    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({username: decoded.username}).exec();
    const filterPosts = user.posts.filter((id) =>  id != req.params.id);

    // $set should be replaced with $pull for efficiency
    const result = await User.updateOne(
      { username: decoded.username },
      { $set: { posts: filterPosts } }
    ).exec();


    await Post.deleteOne({ author: decoded.username, _id: req.params.id });
    await res.status(200).json({ fulfilled: true, remove: post });
  } catch (err) {
    res.status(400).json({ ...defaultReturnObject, fulfilled: false });
  }
});

exports.like_single_post = asyncHandler(async (req, res, next) => {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req.headers.authorization.replace("Bearer ", ""));
    const decoded = jwt.verify(token, jwtSecret);
    const postId = req.params.id;

    const user = await User.findOne({ username: decoded.username }).exec();

    if (user.liked.includes(postId)) {
      await User.updateOne(
        { username: decoded.username },
        { $pull: { liked: postId } }
      );
      await Post.updateOne({ _id: postId }, { $inc: { likes: -1 } }).exec();
    } else {
      await User.updateOne(
        { username: decoded.username },
        { $push: { liked: postId } }
      );
      await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } }).exec();
    }

    // Success
    res.status(200).json({ fulfilled: true });
  } catch (err) {
    res.status(400).json({ ...defaultReturnObject, fulfilled: false });
  }
});

exports.get_single_post_liked = asyncHandler(async (req, res, next) => {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req.headers.authorization.replace("Bearer ", ""));
    const decoded = jwt.verify(token, jwtSecret);
    const postId = req.params.id;

    const user = await User.findOne({ username: decoded.username }).exec();
    if (user.liked.includes(postId)) {
      res.status(200).json({ liked: true, fulfilled: true });
    } else {
      res.status(200).json({ liked: false, fulfilled: true });
    }
  } catch (err) {
    res.status(400).json({ ...defaultReturnObject, fulfilled: false });
  }
});
