const express = require("express");
const router = express.Router();
const {authPostEdit,authorizeUser} = require("../middleware/authMiddleware");
const userControler = require("../controller/userControler")

// add
router.post("/add/cert", authorizeUser, userControler.postcert);
router.post("/add/skill", authorizeUser, userControler.postSkill);
router.post("/add/project", authorizeUser, userControler.postProject);

// get
router.get("/me", authorizeUser, userControler.me);
router.get("/me/skill", authorizeUser, userControler.skillGet);
router.get("/me/project", authorizeUser, userControler.projectGet);
router.get("/me/cert", authorizeUser, userControler.certGet);

// edit 
router.put("/edit/skill/:postId",authorizeUser, authPostEdit, userControler.editSkill)

// delete
router.delete("/delete/:postType/:postId", authorizeUser, authPostEdit, userControler.deletePost);


module.exports = router;