const asyncHandler = require("express-async-handler");
const User = require("../models/user");

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
