const rideModel = require("../models/ride.model");
const { sendMessageToScoketId } = require("../socket");
const mapService = require("./maps.service");
const crypto = require('crypto')

function getOtp(num){
    function generatedOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10,num)).toString();
        return otp;
    }
    return generatedOtp(num);
}

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    console.log("printing distaance and time ->", distanceTime)

    const baseFare = {
        auto: 30,
        car: 50,
        motocycle: 20
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };
    const perMinuteRate = {
        auto: 0.033,
        car: 0.05,
        moto: 0.025
    };


    const fare = {
        distance:Math.round(distanceTime.distance.value/1000),
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value/1000)*perKmRate.auto) + (distanceTime.duration.value * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + (distanceTime.duration.value * perMinuteRate.car)),
        moto: Math.round(baseFare.motocycle + ((distanceTime.distance.value/1000)* perKmRate.moto) + (distanceTime.duration.value * perMinuteRate.moto))
    };
    console.log("printing fare->",fare)
    return fare;
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {

    console.log("printing the details ->" , user, pickup, destination, vehicleType)
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All the fields are required")
    }

    const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        user, pickup,otp:getOtp(6), destination, fare: fare[vehicleType],distance:fare.distance
    })
    return ride

}

module.exports.getFare = getFare;

module.exports.confirmRide = async({
    rideId, captain
}) =>{
    if(!rideId){
        throw new Error ('ride id is required');
    }
    
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'accepted',
        captain:captain._id
    })

    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error ("ride not found");
    }

    return ride;

}


module.exports.startRide = async({rideId, otp , captain})=>{
    if(!rideId || !otp){
        throw new Error ('Ride id and OTP are required');
    }

    const ride  = await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error("Ride not found");
    }

    if(ride.status !== 'accepted'){
        throw new Error('ride not accepted');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'ongoing'
    })

    sendMessageToScoketId(ride.user.socketId, {
        event:'ride-started',
        data:ride
    })

    return ride;
} 

module.exports.endRide = async({rideId , captain})=>{
    if(!rideId){
        throw new Error ('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id:rideId,
        captain:captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error("ride not found");
    }
    if(ride.status !== "ongoing"){
        throw new Error("ride not  ongoing")
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'completed'
    })

    return ride


}