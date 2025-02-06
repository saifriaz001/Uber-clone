import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
const CaptainDetails = () => {
  const [captain] = useContext(CaptainDataContext)

  return (
    <div className=''>
              <div className=' flex flex-col items-center justify-between'>
          <div className='  flex flex-row items-center justify-between  gap-x-40 '>
          <div className=' flex  gap-3 '>
            <img className='h-10 w-10 rounded-full object-cover' src="https://img.freepik.com/free-photo/side-view-man-with-headphones-city_23-2148573084.jpg" alt="" />
            <h4 className=' capitalize text-nowrap text-lg font-medium'>{captain.fullname.firstname +" " + captain.fullname.lastname}</h4>
          </div>
          <div className='  w-full'>
            <h4 className=' text-xl font-semibold' >₹295.20</h4>
            <p className='text-sm  text-gray-600'>Earned</p>
          </div>
          </div>
          <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start '>
            <div className=' text-center '> 
              <i className=" text-3xl mb-2 font-extralight ri-timer-2-line"></i> 
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div  className=' text-center '>
              <i className=" text-3xl mb-2 font-extralight ri-speed-up-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p> 
            </div>
            <div  className=' text-center '>
              <i className=' text-3xl mb-2 font-extralight ri-booklet-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p  className='text-sm text-gray-600'>Hours Online</p>
            </div>
          </div>

        </div>
    </div>
  )
}

export default CaptainDetails
