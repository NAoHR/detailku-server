const getUrlMiddleware = (req,res,next) => {
    req.baseurl = `${req.protocol}://${req.get("host")}`
    return next();
}

const strictBelongsTo = (req, res, next) => {
    const {belongsTo} = req.body;

    if(belongsTo){
        return res.status(401).json({
            ok : false,
            message: "belongsTo detected"
        })
    }
    return next();
}
module.exports = {
    getUrlMiddleware,
    strictBelongsTo
}