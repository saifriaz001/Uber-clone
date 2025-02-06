const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address)=>{
    const apikey = process.env.GOOGLE_MAPS_API;
    const baseUrl =  "https://maps.gomaps.pro/maps/api/geocode/json";
    const params ={
        key:apikey,
        address:address
    };
    try{
        const response = await axios.get(baseUrl ,{ params});
        const data =response.data
        if(data.status === "OK"){
            const location = data.results[0].geometry.location;
            return {lat:location.lat , lon:location.lng};
        }else{
            throw new Error (`Error fetching geocode: ${data.status}`);
        }
    }catch(err){
        console.error("Error fetching error", err)
        throw err;
    }

}

module.exports.getDistanceTime = async(origin , destination) =>{
    if (!origin || !destination){
        throw new Error("Origin and Destination are required");
    }
    const apikey = process.env.GOOGLE_MAPS_API;
    const params ={
        origins:origin,
        destinations:destination,
        key: apikey,
        mode:'driving',
        departure_time:'now',
        traffic_model:'best_guess',
        units:'metric',
        language:'en'
    }
    const url = 'https://maps.gomaps.pro/maps/api/distancematrix/json';
    try{
        const response = await axios.get(url,{params})
        const data = response.data;
        console.log("printing the details of data ->" , data)
        if(data.rows.length >0 && data.rows[0].elements.length >0){
            const elements = data.rows[0].elements[0];
            if(elements.status ==="OK"){
                console.log(`Distance:${elements.distance.text}`)
                console.log(`Duration:${elements.duration.text}`)
            }
            return elements
        }else{
            console.log("Not able to find Distance and durations")
        }

    }catch(err){
        console.error("error fetching data", err)
    }
}

module.exports.getAutoCompleteSuggestions = async(input) =>{
    if(!input){
        throw new Error ('query is required');
    }
    const apikey = process.env.GOOGLE_MAPS_API;
    const params = {
        input:input,
        key:apikey,
        language:"en"
    }
    const url ='https://maps.gomaps.pro/maps/api/place/queryautocomplete/json';
    try{
        const response = await axios.get(url, {params})
        console.log("printing sugesstions",response.data.predictions)
        if (response.data.status === "OK"){
            const suggestions = response.data.predictions;
            return suggestions

        } else{
            console.log("unable to find suggestions" ,response.data.status)
        }
    }catch(err){
        console.error("error fetching loaction suggestions:",err)
        }
    }

module.exports.getCaptainInTheRadius = async(ltd , lng, radius) =>{
    //raidus in km
    const captains = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],radius/6371]
            }
        }

    });

    return captains
}