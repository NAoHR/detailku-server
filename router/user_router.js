const express = require("express");
const router = express.Router();
const {authorization,authentication} = require("../middleware/authMiddleware");
const userControler = require("../controller/userControler")

// add
router.post("/add/cert", authentication, userControler.postcert);
router.post("/add/skill", authentication, userControler.postSkill);
router.post("/add/project", authentication, userControler.postProject);

// get
router.get("/me", authentication, userControler.me);
router.get("/me/skill", authentication, userControler.skillGet);
router.get("/me/project", authentication, userControler.projectGet);
router.get("/me/cert", authentication, userControler.certGet);

// edit 
router.put("/edit/skill/:postId",authentication, authorization, userControler.editSkill)

// delete
router.delete("/delete/:postType/:postId", authentication, authorization, userControler.deletePost);


module.exports = router;