const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const {authentication, authorizationAdmin} = require("../middleware/authMiddleware");

router.post("/add/job", authentication, authorizationAdmin ,adminController.addJob);
router.post("/add/pkl", authentication, authorizationAdmin, adminController.addPkl);

router.put("/edit/job/:jobId", authentication, authorizationAdmin ,adminController.editJob);
router.put("/edit/pkl/:pklId", authentication, authorizationAdmin, adminController.editPkl);

module.exports = router 