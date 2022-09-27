const express = require("express");
const router = express.Router();
const {strictBelongsTo} = require("../middleware/utilMiddleware");
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
router.get("/me/message", authentication, userControler.privateMessageGet);

// edit 
router.put("/edit/skill/:postId",authentication, authorization, strictBelongsTo, userControler.editSkill)
router.put("/edit/project/:postId", authentication, authorization, strictBelongsTo, userControler.editProject);
router.put("/edit/cert/:postId", authentication, authorization, strictBelongsTo, userControler.editCert);

// delete
router.delete("/delete/:postType/:postId", authentication, authorization, userControler.deletePost);


module.exports = router;