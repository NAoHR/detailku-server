const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Token = require("../model/Token.model");
const {Schema} = mongoose;

const AdminScheme = Schema({
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

AdminScheme.methods = {
    createAccessToken : async function (){
        try{
            const {_id} = this;
            const detailkutoken = await jwt.sign({
                "uid" : _id
            },process.env.SECRET_AT,{
                expiresIn : "1d"
            });

            const tokenDb  = new Token({
                tokenId : detailkutoken
            })
            await tokenDb.save();

            return detailkutoken;

        }catch(e){
            console.log(e);
            return false
        }

    }
}

module.exports = mongoose.model("Admin",AdminScheme);