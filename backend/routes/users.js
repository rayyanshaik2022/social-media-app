var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get('/:id/displayName', user_controller.get_user_displayName);

module.exports = router;
