const bcrypt = require("bcrypt");
const User = require("../model/User.model");
const Admin = require("../model/Admin.model");

exports.authlogin = async (req,res) => {
    try{
        let useroradmin = req._parsedUrl.path.split("/")[1];

        const {username, password} = req.body;
        if(username && password){
            let person;

            switch(useroradmin){
                case "user":
                    person = await User.findOne({
                        username : String(username)
                    })
                    break
                case "admin":
                    person = await Admin.findOne({
                        username : String(username)
                    })
                    break;
                default:
                    return res.status(400).json({
                        ok : false,
                        message : "not allowed"
                    })
            }
            if(person){
                const match = await bcrypt.compare(password, person.password);
                if(match){
                    const detailkutoken = await person.createAccessToken();

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