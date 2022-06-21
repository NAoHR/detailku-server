const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

            return detailkutoken;

        }catch(e){
            console.log(e);
            return false
        }

    }
}

module.exports = mongoose.model("Admin",AdminScheme);