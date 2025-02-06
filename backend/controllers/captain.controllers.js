const { ExpressValidator } = require("express-validator");
const captainModel = require("../models/captain.model");
const blacklistTokenSchema = require("../models/blacklistTokenSchema")
const captainService = require("../services/captain.service");
const {validationResult} = require('express-validator');

module.exports.createCaptain = async(req ,res, next) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()});
    }

    const {fullname , email , password , vehicle} =  req.body;

    const captainExists = await captainModel.findOne({email});
    
    if (captainExists){
        return res.status(400).json({message:"captain exits already"});
    }

    const hashedPassword = await captainModel.hashPassword(password)
    
    const captain= await captainService.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate :vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(200).json({captain,token});
}

module.exports.LoginCaptain =async (req,res,next) =>{
    const error = validationResult(req);

    if (!error.isEmpty()){
        return res.status(400).json({
            errors:error.array()
        })
    }

    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if (!captain){
        return res.status(401).json({message:"Please register first"});
    }

    const isMatch = await captain.comparePassword(password,captain.password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"});
    }

    const token = captain.generateAuthToken();
    res.status(200).json({token , captain});


}

module.exports.getCaptainProfile = async(req, res , next) =>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async(req,res,next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenSchema.create({token})

    res.status(200).json({message:"Logged out successfully"});
}