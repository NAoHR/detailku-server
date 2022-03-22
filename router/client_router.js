const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientController");

router.get("/people", clientController.alldata);
router.get("/user/:username", clientController.usernameBasedUser);
router.get("/grade/:grade",clientController.gradeBasedUser);
router.get("/jobs", clientController.jobData);

module.exports = router