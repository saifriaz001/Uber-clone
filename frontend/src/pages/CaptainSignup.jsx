import React ,{useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import  {CaptainDataContext }  from "../context/CaptainContext"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
   const [firstname , setFirstname] = useState('') 
      const [lastname , setLastname] = useState('')
      const [email , setEmail] = useState('')
      const [password , setPassword] = useState('')
      const [vehicleColor , setVehicleColor] = useState('')
      const [vechiclePlate , setVehiclePlate] = useState('')
      const [vechicleCapacity , setVechicleCapacity] = useState('')
      const [vehicleType , setVechicleType] = useState('')

      const  {captain , setCaptain} = useContext(CaptainDataContext)  
      const navigate = useNavigate()

      const submitHandler =async(e)=>{
        e.preventDefault()
        const captainData ={
          fullname:{
            firstname:firstname,
            lastname:lastname
          },
          email,
          password,
          vehicle:{
            color:vehicleColor,
            plate:vechiclePlate,
            capacity:vechicleCapacity,
            vehicleType:vehicleType
          }
        }

        try{
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
          
          if(response.status ==200){
            const data = response.data
            setCaptain(data.user)
            localStorage.getItem('token', data.token)
            navigate('/captain-home')
          }
        }catch(error){
          console.log("there is some error while posting data",error)

        }
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setVechicleCapacity('')
        setVechicleType('')
        setVehicleColor('')
        setVehiclePlate('')
      } 
  
  return (
<div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='  w-16'  src='https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg' alt=''/>
      <form onSubmit={submitHandler}>
        <h3 className='text-lg  mt-4 font-medium mb-2'>What's your name Captain!</h3>
        <div className=' flex  gap-2 mb-4 '>
        <input 
        required
        value={firstname}
        onChange={(e)=>{
          setFirstname(e.target.value)
        }}
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2   text-lg placeholder:text-base '
        type='text' 
        placeholder='First name'/>
        
        <input 
        required
        value={lastname}
        onChange={(e)=>setLastname(e.target.value)}
        className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2  text-lg placeholder:text-base '
         type='text' 
         placeholder='Last name'/>

        </div>
        <h3 className='text-lg   mt-4 font-medium mb-2'> what's your email Captain!</h3>
        <input 

        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '
        required 
        type='email'
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        placeholder='email'/>

        <h3 
        className='text-lg   font-medium mb-2'
        >Enter Password</h3>
        <input 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '
        required 
        type='password'
        placeholder='password'/>
       <h3 className='text-lg   mt-4 font-medium mb-2'>
        Vehicle Information
       </h3>  
       <div className=' flex flex-col gap-4 mb-5'>
       <div className='flex gap-2'> 
       <input
        className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2  text-lg placeholder:text-base '
       required
       type='text'
       placeholder='Vehicle Color'
       value={vehicleColor}
       onChange={(e)=>{setVehicleColor(e.target.value)}}
       />
      <input
       className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2  text-lg placeholder:text-base '
       required
       type='text'
       placeholder='Vehicle Plate'
       value={vechiclePlate}
       onChange={(e)=>{setVehiclePlate(e.target.value)}}
       />
       </div>
       <div className='flex gap-2'>
      <input
       className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2  text-lg placeholder:text-base '
       required
       type="number"
       placeholder='Vehicle Capacity'
       value={vechicleCapacity}
       onChange={(e)=>{setVechicleCapacity(e.target.value)}}
       />
      <select
      className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2  text-lg placeholder:text-base '
      required
      value={vehicleType}
      onChange={(e)=>{setVechicleType(e.target.value)}}
      >
        <option>motocycle</option>
        <option>car</option>
        <option>auto</option>        
      </select>
      </div>
      </div>
        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-base'
        >
          Create Captain Account
        </button>


        <p className='text-center'> Already have an account?  {''}
        <Link to={'/login'} className=' text-blue-600  '>
        Login here     
        </Link>
        </p>



      </form>
      </div>
      <div>
       <p className=' text-[10px]  leading-tight'>
        This site is protected by reCAPTCHA and the <span className='underline'>Google policy</span> and <span className=' underline' >terms of service apply.</span> 
       </p>
      </div>
</div>
  )
}

export default CaptainSignup
