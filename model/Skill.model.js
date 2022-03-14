const mongoose = require("mongoose");
const {Schema} = mongoose;

const SkillSchema = Schema({
    belongsTo : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    skillName : {
        type : String,
        minLength : 2,
        maxLength : 100,
        required : true
    },
    percentage : {
        type : Number,
        min : 0,
        max : 100
    }
})

module.exports = mongoose.model("Skill",SkillSchema)