const User = require("../model/User.model");
const Detail = require("../model/Detail.model");
const Cert = require("../model/Cert.model");
const Skill = require("../model/Skill.model");
const Project = require("../model/Project.model");
const Job = require("../model/Job.model");
const PublicMsg = require("../model/publicMessage.model");
const privateMessage = require("../model/PrivateMessage.model");
const {errorHandler} = require("../utils/utils");

exports.alldata = async function(req,res) {
    try{
        let allData = await User.find();
        const path = `${req.baseurl}/api/client/grade/`;
        return res.status(200).json({
            ok : true,
            message : "successfuly fetched",
            data : [
                {
                    "grade" : "X SIJA",
                    "data" : [
                        {
                            "subgrade" : "X SIJA 1",
                            "path" : `${path}X_SIJA_1`,
                            "count" : allData.filter((val) => val.grade === "X_SIJA_1").length,
                        },
                        {
                            "subgrade" : "X SIJA 2",
                            "path" : `${path}X_SIJA_2`,
                            "count" : allData.filter((val) => val.grade === "X_SIJA_2").length,
                        }
                    ]
                },
                {
                    "grade" : "XI SIJA",
                    "data" : [
                        {
                            "subgrade" : "XI SIJA 1",
                            "path" : `${path}XI_SIJA_1`,
                            "count" : allData.filter((val) => val.grade === "XI_SIJA_1").length,
                        },
                        {
                            "subgrade" : "XI SIJA 2",
                            "path" : `${path}XI_SIJA_2`,
                            "count" : allData.filter((val) => val.grade === "XI_SIJA_2").length,
                        }
                    ]
                },
                {
                    "grade" : "XII SIJA",
                    "data" : [
                        {
                            "subgrade" : "XII SIJA 1",
                            "path" : `${path}XII_SIJA_1`,
                            "count" : allData.filter((val) => val.grade === "XII_SIJA_1").length,
                        },
                        {
                            "subgrade" : "XII SIJA 2",
                            "path" : `${path}XII_SIJA_2`,
                            "count" : allData.filter((val) => val.grade === "XII_SIJA_2").length,
                        }
                    ]
                },
                {
                    "grade" : "XIII SIJA",
                    "data" : [
                        {
                            "subgrade" : "XIII SIJA 1",
                            "path" : `${path}XII_SIJA_1`,
                            "count" : allData.filter((val) => val.grade === "XIII_SIJA_1").length,
                        },
                        {
                            "subgrade" : "XIII SIJA 2",
                            "path" : `${path}XII_SIJA_2`,
                            "count" : allData.filter((val) => val.grade === "XIII_SIJA_2").length,
                        }
                    ]
                }
            ]
        })
    }catch(e){
        return errorHandler(e,res);
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
                    _id : val._id,
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
        return errorHandler(e,res);
    }
}

exports.gradeBasedUser = async function(req,res){
    try {
        const path = `${req.baseurl}/api/client/user`
        const userDetail = async (data) => {
            return Promise.all(data.map(async (val) => {
                let detail = await Detail.findOne({_id : val.detail})
                return await {
                    path : `${path}/${val.username}`,
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
        return errorHandler(e,res);
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
        return errorHandler(e,res);
    }
}


exports.postPublicMsg = async (req, res) => {
    try{
        const body = req.body;
        const createPublicMsg = PublicMsg(body);

        await createPublicMsg.save();

        return res.status(200).json({
            ok: true,
            message: "data added",
            data: createPublicMsg
        })
    }catch(e){
        return errorHandler(e, res);
    }
}

exports.getPublicMsg = async (req, res) => {
    try{
        const allPublicMsg = await PublicMsg.find();
        return res.status(200).json({
            ok: true,
            message: "successfully fetched",
            data: allPublicMsg.reverse()
        })
    }catch(e){
        return errorHandler(e, res);
    }
}

// post

exports.sendPrivateMessage = async (req, res) => {
    try{
        const {userId} = req.params;
        const findUser = await User.findOne({_id: userId});
        console.log(findUser);
        if(findUser){
            const {from, email, message} = req.body
            const newMessage = new privateMessage(
                {
                    from,email,message,belongsTo : findUser._id
                }
            );
            findUser.privateMessage.push(newMessage._id);
            await newMessage.save();
            await findUser.save();
            
            return res.status(200).json({
                ok: true,
                message: "data added"
            })
        }

        throw({name: "UNF"});
    }catch(e){
        return errorHandler(e, res);
    }
}