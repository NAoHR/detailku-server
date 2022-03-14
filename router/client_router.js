const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientController");

router.get("/people", clientController.alldata);
router.get("/user/:username", clientController.usernameBasedUser);
router.get("/grade/:grade",clientController.gradeBasedUser);

module.exports = router