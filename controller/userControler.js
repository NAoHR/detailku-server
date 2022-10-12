const Cert = require("../model/Cert.model");
const User = require("../model/User.model");
const Skill = require("../model/Skill.model");
const Project = require("../model/Project.model");
const Detail = require("../model/Detail.model");
const privatemessage = require("../model/PrivateMessage.model");
const {errorHandler} = require("../utils/utils");
const PrivateMessageModel = require("../model/PrivateMessage.model");
const bcrypt = require("bcrypt");

// ADD - open
exports.postcert = async (req,res) => {
    try{
        const {title,organizer,certID,certLink} = req.body;
        const {uid} = req.userCred;
        console.log(uid,uid)
        const user = await User.findOne({_id : uid});
        if(user){
            const certPost = new Cert({
                belongsTo : String(uid),
                title : String(title),
                organizer : String(organizer),
                certID : String(certID),
                certLink : String(certLink)
            })
            user.certificate.push(certPost._id);
            await certPost.save();
            await user.save();
            return res.status(200).json({
                ok : true,
                message : "data added",
                data : certPost
            })
        }
        throw({
            name : "UNF"
        })

    }catch(e){
        return errorHandler(e,res);
    }
}

exports.postSkill = async (req,res) => {
    try{
        const {skillName,percentage} = req.body;
        const {uid} = req.userCred;
        const user = await User.findOne({_id : uid});

        if(user){
            const skillPost = new Skill({
                belongsTo : uid,
                skillName : String(skillName),
                percentage : Number(percentage)
            })
            user.skill.push(skillPost._id);
            await skillPost.save();
            await user.save();
            return res.status(200).json({
                ok : true,
                message : "data added",
                data : skillPost
            })
        }
        throw({
            name : "UNF"
        })

    }catch(e){
        return errorHandler(e,res);
    }
}

exports.postProject = async (req,res) => {
    try{
        const {name,description,link} = req.body;
        const {uid} = req.userCred;
        const user = await User.findOne({_id : uid});

        if(user){
            const projectPost = new Project({
                belongsTo : uid,
                name : String(name),
                description : String(description),
                link : String(link)
            })
            user.project.push(projectPost._id);
            await projectPost.save();
            await user.save();
            return res.status(200).json({
                ok : true,
                message : "data added",
                data : projectPost
            })
        }
        throw({
            name : "UNF"
        })

    }catch(e){
        return errorHandler(e,res);
    }
}

// ADD - Close

// read - open
exports.me = async (req,res) => {
    try {
        const {uid} = req.userCred;
        const user = await User.findOne({_id : uid});
        if(user){
            const userDetail = await Detail.findOne({_id : user.detail});
            const userSkill = user.skill.length > 0 ? await Skill.find({_id : {$in : user.skill}}) : [];
            const userProject = user.project.length > 0 ? await Project.find({_id : {$in : user.project}}) : [];
            const userCert = user.certificate.length > 0 ? await Cert.find({_id : {$in : user.certificate}}) : [];

            return res.status(200).json({
                ok : true,
                message : "fetched ok",
                data : {
                    username : user.username,
                    name : user.name,
                    grade : user.grade,
                    detail : userDetail,
                    certificate : userCert,
                    skill : userSkill,
                    project : userProject,
                    privatemessage: user.privateMessage
                }
            })
        }
        return res.status(404).json({
            ok : false,
            message : "user not found"
        })
    } catch (e) {
        return errorHandler(e,res);
    }
}

exports.skillGet = async (req,res) => {
    try{
        const {uid} = req.userCred;
        const userSkill = await Skill.find({belongsTo : uid})
        return res.status(200).json({
            ok : true,
            message : "success",
            data : userSkill
        })
    }catch(e){
        return errorHandler(e,res);
    }
}

exports.projectGet = async (req,res) => {
    try{
        const {uid} = req.userCred;
        const userProject = await Project.find({belongsTo : uid})
        return res.status(200).json({
            ok : true,
            message : "success",
            data : userProject
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
    }
}

exports.privateMessageGet = async  (req, res) => {
    try{
        const {uid} = req.userCred;
        
        const allPrivatemsg = await privatemessage.find({ belongsTo: uid});
        return res.status(200).json({
            ok: true,
            data: allPrivatemsg
        })
    }catch(e){
        return errorHandler(e, res)
    }
}

exports.certGet = async (req,res) => {
    try{
        const {uid} = req.userCred;
        const userCert = await Cert.find({belongsTo : uid})
        return res.status(200).json({
            ok : true,
            message : "success",
            data : userCert
        })
    }catch(e){
        return errorHandler(e,res);
    }
}
// read - close

// edit - open
exports.editSkill = async (req,res) => {
    try{
        const body = req.body;
        const bucket = req.bucket;

        const updateSkill = await Skill.updateOne({
            _id : String(bucket._id)
        },body,{
            runValidators : true,
            new: true
        })

        if(updateSkill.matchedCount !== 0){
            if(updateSkill.modifiedCount || updateSkill.upsertedCount){
                return res.status(200).json({
                    ok : true,
                    message : "data updated"
                })
            }
            return res.status(200).json({
                ok : true,
                message : "0 updated"
            })
        }
        throw({name: "DNF"})
    }catch(e){
        return errorHandler(e,res);
    }
}

exports.editProject = async (req, res) => {
    try{
        const body = req.body;
        const bucket = req.bucket;

        const updateProject = await Project.updateOne({
            _id : String(bucket._id)
        },body,{
            runValidators : true,
            new: true
        })

        if(updateProject.matchedCount !== 0){
            if(updateProject.modifiedCount || updateProject.upsertedCount){
                return res.status(200).json({
                    ok : true,
                    message : "data updated"
                })
            }
            return res.status(200).json({
                ok : true,
                message : "0 updated"
            })
        }
        throw({name: "DNF"})
    }catch(e){
        return errorHandler(e, res);
    }
}

exports.editCert = async (req, res) => {
    try{
        const body = req.body;
        const bucket = req.bucket;

        const updateCert = await Cert.updateOne({
            _id : String(bucket._id)
        },body,{
            runValidators : true,
            new: true
        })

        if(updateCert.matchedCount !== 0){
            if(updateCert.modifiedCount || updateCert.upsertedCount){
                return res.status(200).json({
                    ok : true,
                    message : "data updated"
                })
            }
            return res.status(200).json({
                ok : true,
                message : "0 updated"
            })
        }
        throw({name: "DNF"});
    }catch(e){
        return errorHandler(e, res);
    }
}



exports.editCreds = async (req, res) => {
    try{
        const body = req.body;
        const bucket = req.bucket;

        const updateCreds = await Detail.updateOne({
            _id : String(bucket._id)
        },body,{
            runValidators : true,
            new: true
        })

        if(updateCreds.matchedCount !== 0){
            if(updateCreds.modifiedCount || updateCreds.upsertedCount){
                return res.status(200).json({
                    ok : true,
                    message : "data updated"
                })
            }
            return res.status(200).json({
                ok : true,
                message : "0 updated"
            })
        }
        throw({name: "DNF"})
    }catch(e){
        return errorHandler(e, res);
    }
}

exports.editAuth = async (req, res) => {
    try{

        const body = req.body;
        const {uid} = req.userCred;
        const newBody = {};

        if("username" in body) newBody["username"] = body.username;
        if("name" in body) newBody["name"] = body.name;
        if("password" in body) newBody["password"] = await bcrypt.hash(body.password, 10);

        const editUserAuth = await User.updateOne({_id : uid}, newBody,{
            runValidators : true,
            new: true
        } )

        if(editUserAuth.matchedCount !== 0){
            if(editUserAuth.modifiedCount || editUserAuth.upsertedCount){
                return res.status(200).json({
                    ok : true,
                    message : "data updated"
                })
            }
            return res.status(200).json({
                ok : true,
                message : "0 updated"
            })
        }

    }catch(e){
        return errorHandler(e, res);
    }
}
// edit - close

// delete - open

exports.deletePost = async (req,res) => {
    try{
        const {_id} = req.bucket;
        const {postType} = req.params;
        const {uid} = req.userCred;
        let delBucket;
        const postBelongsTo = await User.findById(uid);

        switch(postType){
            case "skill":
                delBucket = await Skill.deleteOne({_id : _id});
                postBelongsTo.skill = postBelongsTo.skill.filter(i => String(i._id) !== String(_id));
                break;
            case "project":
                delBucket = await Project.deleteOne({_id : _id});
                postBelongsTo.project = postBelongsTo.project.filter(i => String(i._id) !== String(_id));
                break;
            case "cert":
                delBucket = await Cert.deleteOne({_id : _id});
                postBelongsTo.certificate = postBelongsTo.certificate.filter(i => String(i._id) !== String(_id));
            case "privateMessage":
                delBucket = await PrivateMessageModel.deleteOne({_id : _id});
                postBelongsTo.privateMessage = postBelongsTo.privateMessage.filter(i => String(i._id) !== String(_id));
                console.log(postBelongsTo)
                break;
            default:
                return res.status(403).json({
                    ok : true,
                    message : "only accept skill, project, cert, and private message"
                })
        }

        await postBelongsTo.save();
        return res.status(200).json({
            ok : true,
            message : `${postType} deleted`
        })
    }catch(e){
        return errorHandler(e,res);
    }
}
