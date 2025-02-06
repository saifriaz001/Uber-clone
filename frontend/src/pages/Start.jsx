import React from 'react'
import { Link } from 'react-router-dom'
const Start = () => {
  return (
    <div>
      <div className=' bg-cover  bg-center bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  w-full flex flex-col justify-between'>
        <img className=' w-16 ml-8'  src='https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg' alt=''/>
        <div className=' bg-white pb-7 py-4  px-4'>
          <h1 className=' text-[30px] font-bold'>Get Started with uber</h1>
          <Link to={"/login"} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 '>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
