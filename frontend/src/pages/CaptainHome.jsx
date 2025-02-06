import React, { useRef, useState , useEffect, useContext } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'



const CaptainHome = () => {
  const [ridePopupPanel , setRidePopupPanel] = useState(false)
  const [confrimRidePopupPanel ,setConfrimRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confrimRidePopupPanelRef = useRef(null)
  const {socket} = useContext(SocketContext)
  const [ captain] = useContext(CaptainDataContext)
  const [ride , setRide] = useState(null)

  useEffect (()=>{
     socket.emit('join', {
      userId:captain._id,
      userType:'captain'
     })
    
    const updateLocation =()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
          socket.emit('update-location-captain',{
            userId:captain._id,
              location:{
                ltd:position.coords.latitude,
                lng:position.coords.longitude
              }
          })
        })
      }
    };
    updateLocation()
    const locationInterval = setInterval(updateLocation,10000);


    return () => clearInterval(locationInterval)
  },[socket , captain._id])

  socket.on('new-ride',(data)=>{
    console.log("data ->",data)
    setRide(data)
    setRidePopupPanel(true)
  })



  async function confirmRide (){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId:ride._id,
      captainId:captain._id,
      
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    setRidePopupPanel(false)
    setConfrimRidePopupPanel(true)

  }
 
  

  

  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(0)'
      })
    } else{
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[ridePopupPanel])


  useGSAP(function(){
    if(confrimRidePopupPanel){
      gsap.to(confrimRidePopupPanelRef.current,{
        transform:'translateY(0)'
      })
    } else{
      gsap.to(confrimRidePopupPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[confrimRidePopupPanel])

  return (
<div className='h-screen'>
      <div className='fixed p-6'>
        <img className='w-16' src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png" alt='uber-logo'/>
      <Link  to={"/captain-home"} className='fixed right-2 top-2 h-10 w-10  rounded-full bg-white flex  items-center justify-center'>
            <i className='text-lg  font-medium ri-logout-box-r-line'></i>
        </Link>

      </div>

        <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2015/11/blog-hero-1080x540.jpg" />
        </div>
        <div className=' h-2/5 p-6'>
           <CaptainDetails/>

        </div>
        <div ref={ridePopupPanelRef} className=' translate-y-full fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
         <RidePopUp setRidePopupPanel={setRidePopupPanel}
          ride={ride}
          confirmRide={confirmRide}
          setConfirmRidePopupPanel={setConfrimRidePopupPanel}/>
        </div>
        <div ref={confrimRidePopupPanelRef} className=' h-screen translate-y-full fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
         <ConfirmRidePopUp 
         ride={ride}
         setConfrimRidePopupPanel={setConfrimRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>
</div>
  )
}

export default CaptainHome
