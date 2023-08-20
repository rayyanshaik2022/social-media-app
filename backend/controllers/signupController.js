const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

function validateUsernameStringLength(username) {
  if (username.length < 3 || username.length > 16) {
    return false;
  }

  return true;
}

function validateUsernameStringCharacters(username) {
  
  if (username.indexOf(" ") >= 0) {
    return false;
  }

  return true;
}

async function validateUsernameDuplicate(username) {
  const user = await User.findOne({ username }).exec();
  return user === undefined || user === null;
}

function validatePasswordString(password) {
  if (password.length < 4 || password.length > 64) {
    return false;
  }

  return true;
}

function validateConfirmPassword(password, confirmPassword) {
  return password == confirmPassword;
}

exports.signup_create_post = asyncHandler(async (req, res, next) => {
  // Validate username string
  if (!validateUsernameStringLength(req.body.username)) {
    res.send({
      message: "Username length must be between 3 and 16 characters!",
      field: "username",
      fulfilled: false,
    });
    return;
  }

  if (!validateUsernameStringCharacters(req.body.username)) {
    res.send({
      message: "Username must not contain invalid characters!",
      field: "username",
      fulfilled: false,
    });
    return;
  }

  if (!(await validateUsernameDuplicate(req.body.username))) {
    res.send({
      message: "This username is taken!",
      field: "username",
      fulfilled: false,
    });
    return;
  }

  if (!validatePasswordString(req.body.password)) {
    res.send({
      message: "Password must be at least 4 characters long!",
      field: "password",
      fulfilled: false,
    });
    return;
  }

  if (!validateConfirmPassword(req.body.password, req.body.confirmPassword)) {
    res.send({
      message: "Your passwords must match!",
      field: "confirm-password",
      fulfilled: false,
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.username,
  });
  await user.save();

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn,
    }
  );

  res.send({ token, fulfilled: true });
});
