const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenSchema = require("../models/blacklistTokenSchema");

module.exports.authUser = async(req , res, next) =>{
    const token = await req.cookies.token ||req.headers.authorization.split(' ')[ 1 ]  ;
    if (!token){
        return res.status(401).json({
            message:"Unauthorized token"
        });
    }

    const isBlacklisted = await blacklistTokenSchema.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized token"})
    }

    try{

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id)
        req.user = user;
        return next()

    }catch(error){
        return res.status(401).json({ message:"Unauthorized"})
    }
}

module.exports.authCaptain = async(req, res,next) =>{
    const token = await req.cookies.token || req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).json({message:"Didn't find token"});
    }

    const isBlacklisted = await blacklistTokenSchema.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized token"})
    }

     
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch(error){
        return res.status(401).json({message:"Unauthorized token"});
    }

}