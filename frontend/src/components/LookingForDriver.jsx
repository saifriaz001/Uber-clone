import React from 'react'

const LookingForDriver = ({vehicleType,fare,pickup,destination  }) => {
  return (
    <div>
        <h5  className='p-3 text-center w-[93%]  absolute top-0  '></h5>
        <h3 className='text-2xl font-semibold mb-5'>Looking for a driver</h3>
        <div className='flex gap-3  justify-between items-center flex-col'>
        <img className=' h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png'/>
        <div className=' w-full mt-5'>
            <div className=' flex items-center gap-5 p-3 border-b-2  border-gray-300'>
                <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>{pickup}</h3>
                {/* <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{pickup}</p> */}
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
        
        </div>
      
    </div>
  )
}

export default LookingForDriver
