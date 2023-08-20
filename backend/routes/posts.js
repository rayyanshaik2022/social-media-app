var express = require('express');
var router = express.Router();

const posts_controller = require("../controllers/postsController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/new", posts_controller.create_post);

module.exports = router;
