const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklist.model")


async function authUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:"Token not available"
        })
    }

    const isTokenBlacklisted = blacklistTokenModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(400).json({
            message:"token blacklisted"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT)
    try{
        req.user = decoded;
        next();
    }catch(err){
        return res.status(400).json({
            message:"Invalid Token"
        })
    }
}

module.exports = authUser;