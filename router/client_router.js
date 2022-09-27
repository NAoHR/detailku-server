const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientController");
const {getUrlMiddleware} = require("../middleware/utilMiddleware");

router.get("/people", getUrlMiddleware, clientController.alldata);
router.get("/user/:username", clientController.usernameBasedUser);
router.get("/grade/:grade",getUrlMiddleware ,clientController.gradeBasedUser);
router.get("/jobs", clientController.jobData);
router.get("/publicMsg", clientController.getPublicMsg);

router.post("/post/publicMsg", clientController.postPublicMsg);
router.post("/post/privateMsg/:userId", clientController.sendPrivateMessage);

module.exports = router