const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authController")
const {authorizeUser} = require("../middleware/authMiddleware");

router.post("/login", authcontroller.authlogin);
router.delete("/logout", authorizeUser, authcontroller.authlogout)

module.exports = router