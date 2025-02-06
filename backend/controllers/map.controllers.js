const {getAddressCoordinate} = require("../services/maps.service.js")
const {validationResult} = require("express-validator")
const {getDistanceTime} = require("../services/maps.service.js")
const {getAutoCompleteSuggestions} = require("../services/maps.service")

module.exports.getCoordinates = async(req , res , next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {address} = req.query;
    try{
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);

    }catch(err){
        res.status(404).json({
            message:"Coordinates not found"
        })
    }
}

module.exports.getDistanceTime = async(req, res, next) =>{
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {origin , destination} = req.query;
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime)

  }catch(err){
    console.error(err)
    res.status(500).json({message:"Error occured while fetching distance and time "})

  }
}

module.exports.getAutoCompleteSuggestions = async(req, res,next) =>{
    try{
        const errors = validationResult(req)
        if(!errors){
            res.status(400).json({errors:errors.array()})
        }
        const {input} = req.query
        const suggestions = await getAutoCompleteSuggestions(input)
        res.status(200).json(suggestions)

    }catch(err){
        console.error( err)
        res.status(500).json({message:"Unable to fetch the sugesstions"})

    }

}