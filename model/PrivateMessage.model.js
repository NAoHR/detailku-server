const mongoose = require("mongoose");
const {Schema} = mongoose;

const PrivateMessageSchema = Schema({
    from: {
        required: [true, "from must be filled"],
        type: String,
        maxLength: 100
    },
    email: {
        required: [true, "from must be filled"],
        type: String,
        validate : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    belongsTo : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        required: [true, "message must be filled"],
        type: String,
        maxLength: 255
    }
})

module.exports = mongoose.model("PrivateMessage", PrivateMessageSchema)