const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProjectSchema = Schema({
    belongsTo : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    name : {
        type : String,
        required : true,
        maxLength : 40
    },
    description : {
        type : String,
        required : true,
        maxLength: 255
    },
    link : {
        type : String,
        required : true,
        maxLength: 255
    }
})

module.exports = mongoose.model("Project",ProjectSchema)
