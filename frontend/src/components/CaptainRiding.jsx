import React, { useState,useRef } from "react";
import { Link , useLocation} from "react-router-dom";
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import FinishRide from "./FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel , setFinishRidePanel] = useState(false)
  const finishRidePanelRef =  useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride
 

  useGSAP(function(){
    if(finishRidePanel){
      gsap.to(finishRidePanelRef.current,{
        transform:'translateY(0)'
      })
    } else{
      gsap.to(finishRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[finishRidePanel])

  return (
    <div className="h-screen">
      
      <div className="fixed p-6">
        <img
          className="w-16"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
          alt="uber-logo"
        />
        <Link
          to={"/captain-home"}
          className="fixed right-2 top-2 h-10 w-10  rounded-full bg-white flex  items-center justify-center"
        >
          <i className="text-lg  font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2015/11/blog-hero-1080x540.jpg"
        />
      </div>
      <div onClick={()=>{setFinishRidePanel(true)}} className=" h-1/5 p-6  flex items-center justify-between relative bg-yellow-400 ">
      <h5 onClick={()=>{}} className='p-3 text-center w-[85%] mb-3 absolute top-0  '><i className=" text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
           <h4 className=" text-xl font-semibold ">{rideData?.distance} Km Away</h4>
           <button className='bg-green-600 rounded-lg font-semibold p-2 px-8 text-white '>Complete Ride</button>

      </div>
      <div ref={finishRidePanelRef} className=' h-screen translate-y-full fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
         <FinishRide rideData={rideData}  setFinishRidePanel={setFinishRidePanel}/>
        </div>
    </div>
  );
};

export default CaptainRiding;
