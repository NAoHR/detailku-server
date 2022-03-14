const bcrypt = require("bcrypt");
const User = require("../model/User.model");
const Token = require("../model/Token.model");

exports.authlogin = async (req,res) => {
    try{
        const {username, password} = req.body;
        if(username && password){
            const user = await User.findOne({
                username : String(username)
            })
            if(user){
                const match = await bcrypt.compare(password, user.password);
                if(match){
                    const detailkutoken = await user.createAccessToken();
                    return res.status(200).json({
                        ok : true,
                        message : "success",
                        detailkutoken : detailkutoken
                    })
                }
                return res.status(401).json({
                    ok : false,
                    message : "wrong password"
                })
            }
            return res.status(400).json({
                ok : false,
                message : "username not found"
            })
        }
        return res.status(400).json({
            ok : false,
            message : "invalid format"
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            ok : false,
            message : "internal error"
        })
    }
}

exports.authlogout = async (req,res) => {
    const {jwt} = req.usercred;
    const deleteOne = await Token.deleteOne({
        tokenId : String(jwt.tokenId)
    })
    console.log(deleteOne)
    return res.json({OK : false})
}