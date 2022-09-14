require("dotenv").config();

exports.errorHandler = (errorMessage,res) => {
    const errMess = (code=501,name="Internal Error",message="internal error occured") => {
        return res.status(code).json({
            ok : false,
            name : name,
            message : message
        })
    }
    console.log(errorMessage);

    switch(errorMessage?.name){
        case "ValidationError":
            const validatorKeys = Object.keys(errorMessage.errors) || []
            let message = `${errorMessage?._message || "validation error"} in ${validatorKeys.join(",")}`

            return errMess(403,errorMessage.name, message);
        case "MongoServerError":
            switch(errorMessage.code){
                case 11000:
                    let keyValue = Object.keys(errorMessage.keyValue);
                    let message = `there ${keyValue.length > 1 ? "are" : "is"} duplicate in ${keyValue.join(",")}`

                    return errMess(403,errorMessage.name,message);
                default:

                    return errMess();
            }
        case "CastError":

            return errMess(403,errorMessage.name,"request not valid")

        case "UNF":
            return errMess(403,errorMessage.name,"user not found")

        case "DNF":
            return errMess(403,errorMessage.name,"Data not found")

        case "Error":
            switch(errorMessage.message){
                case "OIA":
                    return errMess(403,errorMessage.message, "Only Images are allowed");

                case "FTL":
                    return errMess(403,errorMessage.message,"File too Large")

                default:
                    return errMess();

            }
        default:
            return errMess();

    }
}

exports.dbConfig = () => {
    return process.env.STATUS === "deployment" ? process.env.MONGO_DB : process.env.MONGO_DEV
}