const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const {authorizeUser} = require("../middleware/authMiddleware");

router.post("/add/job", authorizeUser ,adminController.addJob);

router.post("/edit/job/:jobId", authorizeUser ,adminController.editJob);

module.exports = router