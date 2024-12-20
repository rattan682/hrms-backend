const express = require("express");
const { registerUser, loginuser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginuser);

module.exports = router;
