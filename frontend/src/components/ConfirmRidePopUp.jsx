import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({ride,setConfrimRidePopupPanel, setRidePopupPanel}) => {
    const [otp , setOtp] = useState('')
    const navigate = useNavigate()
   
    
    const submitHandler=async (e)=>{
        e.preventDefault()
        if (!ride?._id || !otp) {
            console.error("Missing rideId or OTP!");
            return;
        }
        try{
        const response = await axios.get (`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
           params:{ 
                rideId :ride._id,
                otp:otp
            },
            headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
        })

        console.log("response of ride-confrimed ->", response)
        if(response.status === 200){
            setConfrimRidePopupPanel(false)
            setRidePopupPanel(false)
            navigate("/captain-riding",{state:{ride:ride}})
        }
       }catch(error){
        console.error("error confirming ride:", error.response?.data || error.message);
       }
    }
    return (
    <div>
        <h5 onClick={()=>{setRidePopupPanel(false)}} className='p-3 text-center w-[93%]  absolute top-0  '><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
        <div className=' flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='h-12 rounded-full object-cover  w-12' src='https://plus.unsplash.com/premium_photo-1675129779591-c24711697580?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2luZ2xlJTIwbWFufGVufDB8fDB8fHww' />
                <h2 className=' text-lg font-medium '>{ride?.user?.fullname.firstname}</h2>
            </div>
            <h2 className='text-lg font-semibold'>{ride?.distance}Km</h2>
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
        <form>
            
        </form>
        <div className='mt-6 w-full '>
            <form onSubmit={submitHandler}>
                <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} type="text" className='bg-[#eee] px-6 py-2 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP'
                />
            <button  className='text-lg  flex justify-center mt-5 bg-green-600 rounded-lg font-semibold p-3 text-white  w-full'>Confirm</button>
            <button onClick={()=>{setConfrimRidePopupPanel(false) 
            setRidePopupPanel(false)  }} className='w-full  text-lg mt-1 bg-red-600 rounded-lg font-semibold p-3 text-white'>Cancel</button>

            </form>
        
        </div>
        
        </div>
      
    </div>
  )
}

export default ConfirmRidePopUp
