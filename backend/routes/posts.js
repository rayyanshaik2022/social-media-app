var express = require('express');
var router = express.Router();

const posts_controller = require("../controllers/postsController");

/* GET users listing. */
router.get('/', posts_controller.get_posts);

router.post("/new", posts_controller.create_post);

router.get("/single/:id", posts_controller.get_single_post);

router.delete("/delete/:id", posts_controller.delete_single_post);

router.post("/like/:id", posts_controller.like_single_post);

router.get("/liked/:id", posts_controller.get_single_post_liked);


module.exports = router;
