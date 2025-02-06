import React, { useEffect, useState } from 'react'


const LiveTracking = () => {

    const [location , setLocation] = useState({lat:null , lng:null});
    const  [error , setError] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY

    useEffect (()=>{
        const getLocation =()=>{
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    (position) =>{
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        setLocation({lat, lng});
                        setError(null);
                    }

                );
            } else {
                setError('GeoLocation is not supported by this browser.')
            }
        };
        getLocation();

        const intervalId = setInterval(getLocation, 600000);
        return ()=>clearInterval(intervalId);
    },[]);

    console.log("printing the coordinates ->", location)

    const ImageUrl =
    `https://maps.gomaps.pro/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=900x900&markers=color:red|${location.lat},${location.lng}&key=${API_KEY}`
    

  return (
    <div >
    {ImageUrl && <img className='object-cover h-screen' src={ImageUrl} alt="Live Location Map"/>}
    </div>
  )
}

export default LiveTracking
