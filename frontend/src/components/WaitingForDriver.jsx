import React from 'react'

const WaitingForDriver = ({setWaitingForDriver , ride}) => {
    console.log("printing the details for ride ->", ride)
  return (
    <div>
        <h5 onClick={()=>{setWaitingForDriver(false)}} className='p-3 text-center w-[93%]  absolute top-0  '><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <div className=' flex items-center justify-between'>
        <img className=' h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png'/>

            <div className=' text-right'>
                <h2 className='text-xl font-medium capitalize'>{ride?.captain?.fullname?.firstname+" "+ride?.captain?.fullname?.lastname}</h2>
                <h4 className=' text-xl font-semibold -mt-1 -mb-1 capitalize'>{ride?.captain?.vehicle?.plate}</h4>
                <p className=' text-sm text-gray-600'>Maruti Suzuki Alto</p>
                <h1 className='text-lg font-semibold'>{"OTP-"+ride?.otp}</h1>
            </div>
        </div>
        <div className='flex gap-3  justify-between items-center flex-col'>
        
        <div className=' w-full mt-5'>
            <div className=' flex items-center gap-5 p-3 border-b-2  border-gray-300'>
                <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>{ride?.pickup}</h3>
                {/* <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p> */}
            </div>
            </div>
            <div>
            <div className=' flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>{ride?.destination}</h3>
                {/* <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p> */}
            </div>
            </div>
            </div>
            <div>
            <div className=' flex items-center gap-5 p-3  border-gray-300'>
                <i className='ri-currency-line'></i>
            <div>
                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
            </div>
            </div>
            


        </div>
        
        </div>
      
    </div>
  )
}

export default WaitingForDriver
