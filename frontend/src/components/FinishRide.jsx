import React from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import axios from "axios"
const FinishRide = ({rideData,setFinishRidePanel}) => {
    const navigate = useNavigate()

    async function endRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
            rideId:rideData._id
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200){
            setFinishRidePanel(false)
            navigate('/captain-home')
        }
    }
  return (
    <div className="">
        <h5 onClick={()=>{setFinishRidePanel(false)}} className='p-3 text-center w-[93%]  absolute top-0  '><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
        <div className=' flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='h-12 rounded-full object-cover  w-12' src='https://plus.unsplash.com/premium_photo-1675129779591-c24711697580?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2luZ2xlJTIwbWFufGVufDB8fDB8fHww' />
                <h2 className=' text-lg font-medium '>{rideData?.user?.fullname?.firstname}</h2>
            </div>
            <h2 className='text-lg font-semibold'>{rideData?.distance} Km</h2>
        </div>
        <div className='flex gap-3  justify-between items-center flex-col'>
        <div className=' w-full mt-5'>
            <div className=' flex items-center gap-5 p-3 border-b-2  border-gray-300'>
                <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>{rideData?.pickup}</h3>
                {/* <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{rideData?.pickup}</p> */}
            </div>
            </div>
            <div>
            <div className=' flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>{rideData?.destination}</h3>
                {/* <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{rideData?.destination}</p> */}
            </div>
            </div>
            </div>
            <div>
            <div className=' flex items-center gap-5 p-3  border-gray-300'>
                <i className='ri-currency-line'></i>
            <div>
                <h3 className='text-lg font-medium'>₹{rideData?.fare}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
            </div>
            </div>
            


        </div>
        <form>
            
        </form>
        <div className='mt-10 w-full '>

            <button
            onClick={endRide} className=' text-lg flex justify-center mt-5 bg-green-600 rounded-lg font-semibold p-3 text-white  w-full'>Finish Ride</button>
             <p className='text-xs mt-10'>Click on finish ride button if you have completed the payment.</p>
        </div>
        </div>
      
    </div>
  )
}

export default FinishRide
