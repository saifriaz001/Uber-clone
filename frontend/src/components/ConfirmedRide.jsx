import React from 'react'

const ConfirmedRide = ({ vehicleType,fare,pickup,destination,createRide,setVehicleFound ,setConfrimRidePanel}) => {

    const vehicleImages ={
        car:'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png',
        auto:'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
        moto:'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'
    }

    console.log("printing the type of vehicle ->", vehicleType)
  return (
    <div>
        <h5  className='p-3 text-center w-[93%]  absolute top-0  '></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confrim your Ride</h3>
        <div className='flex gap-3  justify-between items-center flex-col'>
        <img className=' h-20' src={vehicleImages[vehicleType]} alt={vehicleType}/>
        <div className=' w-full mt-5'>
            <div className=' flex items-center gap-5 p-3 border-b-2  border-gray-300'>
                <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
            <h3 className='text-lg font-medium'>{pickup}</h3>
                {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                {/* <p className='text-sm -mt-1 text-gray-600'></p> */}
            </div>
            </div>
            <div>
            <div className=' flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>{destination}</h3>
                {/* <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{destination}</p> */}
            </div>
            </div>
            </div>
            <div>
            <div className=' flex items-center gap-5 p-3  border-gray-300'>
                <i className='ri-currency-line'></i>
            <div>
                <h3 className='text-lg font-medium'>₹{fare[vehicleType]}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
            </div>
            </div>
            


        </div>
        <button onClick={()=>{setVehicleFound(true)
            setConfrimRidePanel(false);
            createRide();
            
        }} className=' mt-5 bg-green-600 rounded-lg font-semibold p-2 text-white  w-full'>Confirm</button>
        </div>
      
    </div>
  )
}

export default ConfirmedRide
