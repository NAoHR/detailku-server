const jwt = require("jsonwebtoken");
const Token = require("../model/Token.model");
const Cert = require("../model/Cert.model");
const Project = require("../model/Project.model");
const Skill = require("../model/Skill.model");

require("dotenv").config();

const authorizeUser = async (req,res,next) => {
    try{
        const {authorization} = req.headers;
        if(authorization){
            const authToken = authorization.split(" ")[1];
            return await jwt.verify(authToken,process.env.SECRET_AT, async function(err,decoded){
                const findToken = await Token.findOne({
                    tokenId : authToken
                });
                if(findToken){

                    if(err){
                        switch(err.name){
                            case "TokenExpiredError" :
                                if(findToken){
                                    await Token.deleteOne({
                                        tokenId : authToken
                                    });
                                }
    
                                return res.status(401).json({
                                    ok : false,
                                    message : "token expired"
                                });
                            case "JsonWebTokenError":
                                return res.status(401).json({
                                    ok : false,
                                    message : "wrong token format"
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
                        jwt : findToken
                    };
                    return next();
                }
                return res.status(404).json({
                    ok : false,
                    message : "token not found"
                })
            })
        }
        return res.status(404).json({
            ok : false,
            message : "token not found"
        })
    }catch(e){
        console.log(e);
    }
}

const authPostEdit = async (req,res) => {
    try {
        const {uid} = req.usercred;
        const {postId, postType} = req.body;
        if(postId && postType){
            let bucket;
            switch(postType){
                case "cert":
                    bucket = await Cert.findById(postId);
                    break;
                case "project":
                    bucket = await Project.findById(postId);
                    break;
                case "skill":
                    bucket = await Skill.findById(postId);
                    break;
                default:
                    return res.status(400).json({
                        ok : false,
                        message : "false postType format"
                    })
            }
            if(bucket){
                if(bucket.belongsTo === uid){
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
        console.log(e);
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
    }
}

module.exports = {
    authorizeUser,
    authPostEdit
}