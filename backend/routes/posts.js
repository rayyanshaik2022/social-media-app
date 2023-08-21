var express = require('express');
var router = express.Router();

const posts_controller = require("../controllers/postsController");

/* GET users listing. */
router.get('/', posts_controller.get_posts);

router.post("/new", posts_controller.create_post);

module.exports = router;
