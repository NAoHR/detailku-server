const Cert = require("../model/Cert.model");
const User = require("../model/User.model");
const Skill = require("../model/Skill.model");
const Project = require("../model/Project.model");
const Detail = require("../model/Detail.model");
const {errorHandler} = require("../utils/utils");

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
                    project : userProject
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
                postBelongsTo.skill = postBelongsTo.skill.filter((i) => i === _id);
                break;
            case "project":
                delBucket = await Project.deleteOne({_id : _id});
                postBelongsTo.project = postBelongsTo.project.filter((i) => i === _id);
                break;
            case "cert":
                delBucket = await Cert.deleteOne({_id : _id});
                postBelongsTo.cert = postBelongsTo.cert.filter((i) => i === _id);
                break;
            default:
                return res.status(403).json({
                    ok : true,
                    message : "only accept skill, project, cert"
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
