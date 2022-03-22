const User = require("../model/User.model");
const Detail = require("../model/Detail.model");
const Cert = require("../model/Cert.model");
const Skill = require("../model/Skill.model");
const Project = require("../model/Project.model");
const Job = require("../model/Job.model");

exports.alldata = async function(req,res) {
    try{
        console.log(req);
        let allData = await User.find();
        return res.status(200).json({
            ok : true,
            message : "successfuly fetched",
            data : [
                {
                    "grade" : "X SIJA 1",
                    "count" : allData.filter((val) => val.grade === "X_SIJA_1").length,
                },
                {
                    "grade" : "X SIJA 2",
                    "count" : allData.filter((val) => val.grade === "X_SIJA_2").length,
                },
                {
                    "grade" : "XI SIJA 1",
                    "count" : allData.filter((val) => val.grade === "XI_SIJA_1").length,
                },
                {
                    "grade" : "XI SIJA 2",
                    "count" : allData.filter((val) => val.grade === "XI_SIJA_2").length,
                },
                {
                    "grade" : "XII SIJA 1",
                    "count" : allData.filter((val) => val.grade === "XII_SIJA_1").length,
                },
                {
                    "grade" : "XII SIJA 2",
                    "count" : allData.filter((val) => val.grade === "XII_SIJA_2").length,
                }
            ]
        })
    }catch(e){
        console.log(e);
        return res.status(501).json({
            ok : true,
            message : "internal Error"
        })
    }
}

exports.usernameBasedUser = async function(req,res){
    const {username} = req.params;
    try{
        const getUserCred = async (data) => {
            console.log(data[0].skill);
            const userDetail = await Detail.findOne({_id : data[0].detail});
            const userCert = data[0].certificate.length > 0 ? await Cert.find({_id : { $in : data[0].certificate}}) : [];
            const userProject = data[0].project.length > 0 ? await Project.find({_id : { $in : data[0].project}}) : [];
            const userSkill = data[0].skill.length > 0 ? await Skill.find({_id : { $in : data[0].skill}}) : [];

            return data.map((val)=>{
                return {
                    username : val.username,
                    name : val.name,
                    grade : val.grade,
                    certificate : userCert,
                    project : userProject,
                    skill : userSkill,
                    detail : {
                        description : userDetail.description,
                        instagram : userDetail.instagram,
                        linkedin : userDetail.linkedin,
                        github : userDetail.github,
                        email : userDetail.email,
                        web : userDetail.web,
                        picture : userDetail.picture,
                    }
                }
            })
        }

        const usernameBU = await User.find({
            username : String(username)
            
        })

        return await res.status(200).json({
            ok : true,
            message : usernameBU.length === 0 ? "no user" : "user found",
            data : usernameBU.length ===  0 ? [] : await getUserCred(usernameBU)
        })
    }catch(e){
        console.log(e);
        return res.status(501).json({
            ok : true,
            message : "internal Error"
        })
    }
}

exports.gradeBasedUser = async function(req,res){
    try {
        const userDetail = async (data) => {
            return Promise.all(data.map(async (val) => {
                let detail = await Detail.findOne({_id : val.detail})
                return await {
                    username : val.username,
                    name : val.name,
                    grade : val.grade,
                    certificate : val.certificate,
                    project : val.project,
                    skill : val.skill,
                    detail : {
                        picture : detail.picture,
                        description : detail.description ? detail.description : ""
                    }
                }    
            }))
        }
        
        const {grade} = req.params;
        const gradeBUs = await User.find({
            grade : String(grade)
        })
        return await res.status(200).json({
            ok : true,
            message : gradeBUs.length === 0 ? "no user" : "user found",
            data : gradeBUs.length ===  0 ? [] : await userDetail(gradeBUs)
        })

    } catch (e) {
        console.log(e);
        return res.status(501).json({
            ok : true,
            message : "internal Error"
        })
    }
}

exports.jobData = async (req,res) => {
    try{
        const JobData = await Job.find();
        return res.status(200).json({
            ok : true,
            message : "successfully fetched",
            data : JobData
        })
    }catch(e){
        console.log(e)
        return res.status(501).json({
            ok : false,
            message : "internal Error"
        })
    }
}