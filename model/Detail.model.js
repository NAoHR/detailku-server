const mongoose = require("mongoose");
const { Schema } = mongoose;

const DetailSchema = Schema({
    belongsTo : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true,
    },
    description : {
        type : String,
        maxLength : 180,
    },
    instagram : {
        type : String,
        maxLength : 100,
    },
    linkedin : {
        type : String,
        maxLength : 100,
    },
    github : {
        type : String,
        maxLength : 100,
    },
    email : {
        type : String,
        maxLength : 100,
    },
    web : {
        type : String,
        maxLength : 100,
    },
    picture : {
        type : String
    }
})

module.exports = mongoose.model("Detail",DetailSchema)
