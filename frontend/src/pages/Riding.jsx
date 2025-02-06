import React from 'react'
import { Link,  useLocation } from 'react-router-dom'
import {useEffect , useContext} from "react"
import { SocketContext } from '../context/SocketContext' 
import { useNavigate } from 'react-router-dom'

const Riding = () => {
    const location = useLocation()
    const{ride} = location.state || {}
    const {socket} = useContext(SocketContext)
    const navigate  = useNavigate()

    socket.on("ride-ended",()=>{
        navigate("/home")
    })

  return (
    <div className='h-screen'>
        <Link  to={"/home"} className='fixed right-2 top-2 h-10 w-10  rounded-full bg-white flex  items-center justify-center'>
            <i className='text-lg  font-medium ri-home-5-line'></i>
        </Link>
        <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2015/11/blog-hero-1080x540.jpg" />
        </div>
        <div className=' h-1/2 p-4'>
        <div className=' flex items-center justify-between'>
        <img className=' h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png'/>

            <div className=' text-right'>
                <h2 className='text-lf font-medium'>{ride?.captain?.fullname?.firstname}</h2>
                <h4 className=' text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                <p className=' text-sm text-gray-600'>Maruti Suzuki Alto</p>
            </div>
        </div>
        <div className='flex gap-3  justify-between items-center flex-col'>
        
        <div className=' w-full mt-5'>

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
                <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
            </div>
            </div>
            
        </div>
        
        </div>
          <button className=' w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a payment </button>

        </div>
    </div>
  )
}

export default Riding
