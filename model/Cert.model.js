const mongoose = require("mongoose");
const {Schema} = mongoose;

const CertSchema = Schema({
    belongsTo : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true,
        maxLength : 150
    },
    organizer : {
        type : String,
        required : true,
        maxLength : 150
    },
    certID : {
        type : String,
        required : true,
    },
    certLink : {
        type : String
    }
})

module.exports = mongoose.model("Cert",CertSchema)