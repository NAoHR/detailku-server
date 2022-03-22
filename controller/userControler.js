const Cert = require("../model/Cert.model");
const User = require("../model/User.model");
const Skill = require("../model/Skill.model");
const Project = require("../model/Project.model");
const Detail = require("../model/Detail.model");

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
        return res.status(400).json({
            ok : false,
            message : "user not found"
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
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
        return res.status(400).json({
            ok : false,
            message : "user not found"
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
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
        return res.status(400).json({
            ok : false,
            message : "user not found"
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
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
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
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
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
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
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
    }
}
// read - close

// edit - open
exports.editSkill = async (req,res) => {
    try{
        const {
            skillName,percentage
        } = req.body;
        const bucket = req.bucket;

        const updateData = await Skill.updateOne({
            _id : String(bucket._id)
        },{
            skillName : skillName,
            percentage : percentage
        },{
            runValidators : true,
            upsert: true
        })
        if(updateData.modifiedCount || updateData.upsertedCount){
            return res.status(200).json({
                ok : true,
                message : "data updated"
            })
        }
        return res.status(200).json({
            ok : true,
            message : "0 updated"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
    }
}

exports.editCert = async (req,res) => {
	const {} = req.body;

}

exports.editProject = async (req,res) => {
    
}
// edit - close
