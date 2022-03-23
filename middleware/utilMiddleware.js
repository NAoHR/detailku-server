const getUrlMiddleware = (req,res,next) => {
    req.baseurl = `${req.protocol}://${req.get("host")}`
    return next();
}

module.exports = {
    getUrlMiddleware
}