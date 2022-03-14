const mongoose = require("mongoose");
const { Schema } = mongoose;

const DetailSchema = Schema({
    belongsTo : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true,
        default : undefined
    },
    description : {
        type : String,
        maxLength : 180,
        default : undefined
    },
    instagram : {
        type : String,
        maxLength : 100,
        default : undefined
    },
    linkedin : {
        type : String,
        maxLength : 100,
        default : undefined
    },
    github : {
        type : String,
        maxLength : 100,
        default : undefined
    },
    email : {
        type : String,
        maxLength : 100,
        default : undefined
    },
    web : {
        type : String,
        maxLength : 100,
        default : undefined
    },
    picture : {
        type : String,
        default : "https://rcmi.fiu.edu/wp-content/uploads/sites/30/2018/02/no_user.png"
    }
})

module.exports = mongoose.model("Detail",DetailSchema)