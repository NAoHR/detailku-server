const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const {authentication, authorizationAdmin} = require("../middleware/authMiddleware");

router.post("/add/job", authentication, authorizationAdmin ,adminController.addJob);

router.post("/edit/job/:jobId", authentication, authorizationAdmin ,adminController.editJob);

module.exports = router 