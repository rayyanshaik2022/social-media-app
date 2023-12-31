require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const jwt = require("jsonwebtoken");
const User = require("./models/user");
const crypto = require("crypto");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

const signup_controller = require("./controllers/signupController");
const login_controller = require("./controllers/loginController");

var app = express();

// Cors
app.use(cors());

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://rayyanshaik2022:${process.env.DB_KEY}@cluster1.q9nbmdg.mongodb.net/local_library?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB!");
}

// Passport
app.use(
  session({ secret: "ilovedogs", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// Handle sign-up
app.post("/sign-up", signup_controller.signup_create_post);

// Handle log-in
app.post("/log-in", login_controller.login_user);

// GET USER FROM TOKEN API
app.get("/auth/me", async (req, res) => {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req.headers.authorization.replace("Bearer ", ""));
    const decoded = jwt.verify(token, jwtSecret);

    const getUserResponse = await User.findOne({ username: decoded.username }).exec();

    const nextUser = {...getUserResponse._doc};

    if (!nextUser) {
      res.status(400).json(defaultReturnObject);
      return;
    }

    delete nextUser.password;

    res.status(200).json({ authenticated: true, user: nextUser });
  } catch (err) {
    console.log("POST auth/me, Something Went Wrong");
    res.status(400).json(defaultReturnObject);
  }
});

// Error handle

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
