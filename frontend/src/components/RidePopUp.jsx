import React from 'react'

const RidePopUp = ({confirmRide,ride,setRidePopupPanel ,setConfirmRidePopupPanel}) => {
  return (
    <div className=''>
        <h5 onClick={()=>{setRidePopupPanel(false)}} className='p-3 text-center w-[93%]  absolute top-0  '><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
        <div className=' flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='h-12 rounded-full object-cover  w-12' src='https://plus.unsplash.com/premium_photo-1675129779591-c24711697580?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2luZ2xlJTIwbWFufGVufDB8fDB8fHww' />
                <h2 className=' text-lg font-medium '>{ride?.user.fullname.firstname +" "+ride?.user.fullname.lastname}</h2>
            </div>
            <h2 className='text-lg font-semibold'>{ride?.distance} Km</h2>
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
        <div className=' mt-5 flex items-center justify-between gap-20 '>
        <button onClick={()=>{setConfirmRidePopupPanel(true)
            confirmRide()
        }} className='  bg-green-600 rounded-lg font-semibold p-3 px-10 text-white  '>Accept</button>
        <button onClick={()=>{setRidePopupPanel(false)}} className='px-10 bg-gray-300 rounded-lg font-semibold p-3 text-gray-700'>Ignore</button>
        </div>

        </div>
      
    </div>
  )
}

export default RidePopUp
