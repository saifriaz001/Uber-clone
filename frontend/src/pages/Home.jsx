import React, { useState , useRef, useContext, useEffect } from 'react'
import {useGSAP} from '@gsap/react';
import axios from "axios"
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LiveTracking from '../components/LiveTracking';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import  {UserDataContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [pickup , setPickup] = useState("")
  const[destination , setDestination] = useState("")
  const [ panelOpen , setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const confrimRidePanelRef = useRef(null)
  const planeCloseRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const  [vehiclePanel , setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const  [confrimRidePanel , setConfrimRidePanel] = useState(false)
  const [vehicleFound , setVehicleFound] = useState(false)
  const [waitingForDriver , setWaitingForDriver] = useState(false)
  const [pickupSuggestions , setPickupSugestions] = useState([])
  const [destinationSuggestions , setDestinationSuggestions]  =useState([])
  const [activeField , setActiveField] = useState(null)
  const [fare , setFare] = useState({})
  const [vehicleType , setVehicleType] = useState(null)
  const [ ride , setRide ] = useState(null)
   const { socket} = useContext(SocketContext)
  const [user] = useContext(UserDataContext)

  const navigate = useNavigate()

  useEffect(()=>{
    socket.emit("join",{userType:"user", userId:user._id })
  },[user])

  socket.on('ride-confirmed', ride =>{
    console.log("ride confirm ->", ride)
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride =>{
    console.log("ride  started ->", ride)
    console.log("ridestarted ->", ride)
    setWaitingForDriver(false)
    navigate('/riding',{state:{ride}})
  })

  const handlePickupChange = async (e) =>{
    setPickup(e.target.value)
    try {
      const response  = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {params:{input:e.target.value},
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      const descriptions = [];
      if(Array.isArray(response.data)){
        const descriptions = response.data.map(item =>item.structured_formatting?.main_text || item.description);
        setPickupSugestions(descriptions)
      }
      

    }catch(error){
      console.log("printing the error unable to find the pickup suggestions ->", error )
    }
  } 

  const handleDestinationChange = async(e) =>{
    setDestination(e.target.value)
    try{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {params:{input:e.target.value},
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    const descriptions = [];
    if(Array.isArray(response.data)){
      const descriptions = response.data.map(item =>item.structured_formatting?.main_text || item.description);
      setDestinationSuggestions(descriptions)
    }
    


    }catch(err){
      console.error("",err)
    }
  }
  const submitHandler =(e)=>{
    e.preventDefault()
  }
 async function findfare  (){
  setVehiclePanel(true)
  setPanelOpen(false)
  try{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      params:{ pickup, destination},
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log("printing the response data ->", response.data)
    setFare(response.data)
    }catch(error){
    console.error("cant Find the ride fare ->", error)
    }
  }

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log("confirm Ride ->", response)
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height: "100%",
        padding: 10,
        backgroundColor: "#ffffff"
      })
      gsap.to(planeCloseRef.current,{
        
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:0
      })
      gsap.to(planeCloseRef.current,{
        opacity:0,

      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      
      
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }


  },[vehiclePanel])

  useGSAP(function(){
    if(confrimRidePanel){
      gsap.to(confrimRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(confrimRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }


  },[confrimRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(100%)'
      })
    }


  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(0)',
        height:"60%"
      })
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(100%)'
      })
    }


  },[waitingForDriver])

  return (
    <div className=' h-screen relative overflow-hidden'>
    
      <img className=' w-16 absolute  left-5 top-10' 
       src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
       alt="Uber Logo"
      />
      <div onClick={()=>{
        setVehiclePanel(false)
      }}>
        <LiveTracking/>

      </div>




      <div className=' flex flex-col justify-end   h-screen  absolute top-0 w-full '>
        <div className=' h-[40%] p-5 bg-white relative'>
        <h5 ref={planeCloseRef} onClick={()=>{
          setPanelOpen(false)
        }} className=' opacity-0 absolute right-6   text-2xl mt-5 '>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className=' text-2xl mt-5 font-semibold '>Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
        <div className='line left-10 absolute h-16 w-1 rounded-full top-[40%] bg-gray-700'></div>

          <input 
          value={pickup}
          onClick={()=>{
            setPanelOpen(true)
            setActiveField('pickup')
          }}
          onChange={handlePickupChange}
          className=' mt-5 bg-[#eee] px-12 py-2 text-base rounded-lg w-full' type="text" placeholder='Add a pick-up location'/>
          <input 
          onClick={()=>{
            setPanelOpen(true)
            setActiveField('destination')
          }}
          value={destination}
          onChange={handleDestinationChange}
          className='mt-3 bg-[#eee] px-12 py-2 text-base rounded-lg w-full' type ="text" placeholder='Enter your destination'/>
        </form>
        <button onClick={findfare} className='bg-black text-white px-4 py-2 rounded-lg mt-5 w-full'>
          Find Trip
        </button>
        </div>
        <div ref={panelRef}  className=''>
          <LocationSearchPanel 
            suggestions={activeField==='pickup'?pickupSuggestions:destinationSuggestions}
            setPickup={setPickup}
            setDestination ={setDestination}
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanel} 
            setVehiclePanel={setVehiclePanel}
            activeField={activeField}/>
        </div>

      </div>
      <div ref={vehiclePanelRef} className=' flex flex-col gap-2 translate-y-full fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
       <VehiclePanel
       selectVehicle={setVehicleType}
       fare={fare} setConfrimRidePanel={setConfrimRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div ref={confrimRidePanelRef} className=' flex flex-col gap-2 translate-y-full fixed w-full z-10 bottom-0  mb-2 bg-white px-3 py-6 pt-12'>
        <ConfirmedRide 
        vehicleType={vehicleType}
        fare={fare}
        pickup ={pickup}
        destination ={destination}
        createRide ={createRide}
        setVehicleFound={setVehicleFound} setConfrimRidePanel={setConfrimRidePanel}/>
      </div>
      <div ref={vehicleFoundRef}  className=' flex flex-col gap-2 translate-y-full fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-8'>
        <LookingForDriver
        vehicleType={vehicleType}
        fare={fare}
        pickup ={pickup}
        destination ={destination}
        createRide ={createRide}
        setVehicleFound={setVehicleFound}
        />
      </div>
      <div ref ={waitingForDriverRef} className=' flex flex-col gap-2  fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
        <WaitingForDriver
        ride ={ride}
         setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}
 
export default Home
