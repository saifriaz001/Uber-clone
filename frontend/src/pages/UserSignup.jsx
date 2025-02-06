import React, {useContext, useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from "axios"
import {UserDataContext} from '../context/UserContext'
const UserSignup =  () => {
    const [firstname , setFirstname] = useState('') 
    const [lastname , setLastname] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')


    const navigate = useNavigate()
    const [user , setUser] = useContext(UserDataContext)


    const submitHandler = async(e)=>{
      e.preventDefault()

      const newUser ={
      fullname:{
        firstname:firstname ,
        lastname :lastname
      } ,
      email:email , 
      password:password}

     
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status == 201){
        const data = response.data
        setUser(data.user)
        localStorage.setItem("token" , data.token)
        navigate('/home')
      }
      

      
      
      setEmail('')
      setPassword('')
      setFirstname('')
      setLastname('')
    } 



  return (
<div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='  w-16'  src='https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg' alt=''/>
      <form onSubmit={submitHandler}>
        <h3 className='text-lg  mt-4 font-medium mb-2'>What's your name</h3>
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
        <h3 className='text-lg   mt-4 font-medium mb-2'> what's your email</h3>
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

        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-base'
        >Create account
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

export default UserSignup
