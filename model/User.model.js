const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { Schema } = mongoose;

const UserSchema = Schema({
    name : {
        type : String,
        required : true,
        minLength : 3
    },
    password : {
        type : String,
        required : true,
    },
    grade : {
        type : String,
        required : true,
        enum : [
            "X_SIJA_1",
            "X_SIJA_2",
            "XI_SIJA_1",
            "XI_SIJA_2",
            "XII_SIJA_1",
            "XII_SIJA_2"
        ]
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    detail : {
        type : Schema.Types.ObjectId,
        ref : "Detail"
    },
    certificate : [
        {
            type : Schema.Types.ObjectId,
            ref : "Cert"
        }
    ],
    project : [
        {
            type : Schema.Types.ObjectId,
            ref : "Project"
        }
    ],
    skill : [{
        type : Schema.Types.ObjectId,
        ref : "Skill"
    }]
})

UserSchema.methods = {
    createAccessToken : async function (){
        try{
            const {_id} = this;
            const detailkutoken = await jwt.sign({
                "uid" : _id
            },process.env.SECRET_AT,{
                expiresIn : "2d"
            });

            return detailkutoken;

        }catch(e){
            return false
        }

    }
}

module.exports = mongoose.model("User",UserSchema);