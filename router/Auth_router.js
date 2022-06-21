const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authController")

router.post("/user/login", authcontroller.authlogin);
router.post("/admin/login", authcontroller.authlogin);

module.exports = router