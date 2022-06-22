const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const {authentication} = require("../middleware/authMiddleware");

router.post("/add/job", authentication ,adminController.addJob);

router.post("/edit/job/:jobId", authentication ,adminController.editJob);

module.exports = router