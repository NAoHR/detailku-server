const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const PklSchema = Schema({
    companyName : {
        type : String,
        required: [true, "company name required"]
    },
    description : {
        type: String,
        maxLength: [250, "must be less than 250"],
        required: [true, "description required"]
    },
    location: {
        type: String,
        required: [true, "must insert location"]
    },
    lookingFor : [
        {
            type: String
        }
    ],
    adviceFromSenior : [
        {
            type: String,
            maxLength: 255
        }
    ]
})

module.exports = model("Pkl", PklSchema)