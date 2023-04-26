const express = require('express');
const router = express.Router();

// Body parser
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// require the controllers
const { registerUser, loginUser } = require("../controllers/userController");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;