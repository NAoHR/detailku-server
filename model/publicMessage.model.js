const mongoose = require("mongoose");
const {Schema} = mongoose;

const PublicMsgSChema = Schema({
    sender : {
        type: String,
        default : "Anon",
        maxLength: 25
    },
    message: {
        type: String,
        maxLength: 255,
        required: [true, "message must be filled"]
    }
})

module.exports = mongoose.model("PublicMsg", PublicMsgSChema)