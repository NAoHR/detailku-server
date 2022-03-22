const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authController")
const {authorizeUser} = require("../middleware/authMiddleware");

router.post("/user/login", authcontroller.authlogin);
router.post("/admin/login", authcontroller.authlogin);
router.delete("/logout", authorizeUser, authcontroller.authlogout)

module.exports = router