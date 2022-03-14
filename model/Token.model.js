const mongoose = require("mongoose");
const {Schema} = mongoose;

const TokenSchema = Schema({
    tokenId : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Token",TokenSchema);

