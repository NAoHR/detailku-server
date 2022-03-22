const mongoose = require("mongoose");
const {Schema} = mongoose;

const JobVacancySchema = Schema({
    title : {
        type : String,
        required : [true,"title required"],
		maxLength : 40
    },
    description : {
        type : String,
        maxLength : [250, "must be less than 250"]
    },
    reqruiter : {
        type : String,
        required : [true,"Reqruiter required"],
		maxLength : [30,"must be less than 30"]
    },
    region : {
        type : String,
        required : [true,"Region required"],
		maxLength : [30,"must be less than 30"]
    },
    category : {
        type : String,
        required : [true,"Category required"],
		maxLength : [30,"must be less than 30"]
    },
    salary : {
        from : {
            type : Number,
            required : [true,"from required"]
        },
        to : {
            type : Number,
            required : [true,"to required"]
        }
    },
    more : {
        type : String,
        required : [true,"more required"]
    }
})

module.exports = mongoose.model("Jobvacancy",JobVacancySchema);
