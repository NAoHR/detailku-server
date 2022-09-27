const jwt = require("jsonwebtoken");
const Cert = require("../model/Cert.model");
const Project = require("../model/Project.model");
const Skill = require("../model/Skill.model");
const Detail = require("../model/Detail.model");
const Admin = require("../model/Admin.model");
const { errorHandler } = require("../utils/utils");
const PrivateMessageModel = require("../model/PrivateMessage.model");

require("dotenv").config();

const authentication = async (req,res,next) => {
    try{
        const {authorization} = req.headers;
        if(authorization){
            const authToken = authorization.split(" ")[1];
            return await jwt.verify(authToken,process.env.SECRET_AT, async function(err,decoded){
                if(err){
                    switch(err.name){
                        case "TokenExpiredError" :
                            return res.status(401).json({
                                ok : false,
                                failedLoginRelated : true,
                                message : "Session expired"
                            });
                        case "JsonWebTokenError":
                            return res.status(401).json({
                                ok : false,
                                failedLoginRelated : true,
                                message : "kamu telah logout"
                            })
                        default:
                            console.log(err);
                            return res.status(501).json({
                                ok : true,
                                message : "internal error"
                            })
                    }
                }
                req.userCred = {
                    uid : decoded.uid,
                    jwt : authToken
                };
                return next();
            })
        }
        return res.status(404).json({
            ok : false,
            message : "token not found"
        })
    }catch(e){
        return errorHandler(e, res);
    }
}

const authorization = async (req,res,next) => {
    try {
        const {uid} = req.userCred;
        const postType = req.url.split("/")[2];
        const {postId} = req.params;

        if(postId && postType){
            let bucket;
            switch(postType){
                case "cert":
                    bucket = await Cert.findOne({_id : postId});
                    break;
                case "project":
                    bucket = await Project.findOne({_id : postId});
                    break;
                case "skill":   
                    bucket = await Skill.findOne({_id : postId});
                    break;
                case "detail":
                    bucket = await Detail.findOne({_id : postId});
                    break
                case "privateMessage":
                    bucket = await PrivateMessageModel.findOne({_id: postId});
                    console.log(bucket)
                    break;

                default:
                    return res.status(400).json({
                        ok : false,
                        message : "false postType format"
                    })
            }
            if(bucket){
                
                if(bucket.belongsTo.toString() === uid){
                    req.bucket = bucket;
                    return next()
                }
                return res.status(401).json({
                    ok : false,
                    message : "not authorized"
                })
            }
            return res.status(404).json({
                ok : false,
                message : "data not found"
            })
        }
        return res.status(400).json({
            ok : false,
            message : "format error"
        })

    } catch (e) {
        return errorHandler(e, res);
    }
}

const authorizationAdmin = (req, res, next) => {
    try{
        const {uid} = req.userCred;
        const isAdmin = Admin.findById(uid);
        if(isAdmin){
            return next();
        }
        return res.status(403).json({
            ok: false,
            message: "access denied"
        })
    }catch(e){
        console.log(e);
    }
}


module.exports = {
    authentication,
    authorization,
    authorizationAdmin
}