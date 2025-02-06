import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'
const UserLogin = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const navigate  = useNavigate()
  const [user ,setUser] = useContext(UserDataContext)

  const submitHandler = async (e)=>{
    e.preventDefault()

    const userData = {
      email: email,
      password :password
      
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
    console.log("printing the value of response", response)
    if(response.status ==200){
      const data = response.data 
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

  }  
  return (

    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='  w-16'  src='https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg' alt=''/>
      <form onSubmit={submitHandler}>
        <h3 className='text-lg  mt-4 font-medium mb-2'>What's your email</h3>
        <input 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base '
         type='email' 
         placeholder='email@example.com'/>
        <h3 
        className=' text-lg  font-medium mb-2'
        >Enter Password</h3>
        <input 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '
        required 
        type='password'
        placeholder='password'/>

        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg'
        >Login
        </button>


        <p className='text-center'> New here?  {''}
        <Link to={'/signup'} className=' text-blue-600  '>
        Create new Account       
        </Link>
        </p>



      </form>
      </div>
      <div>
        <Link 
        to={"/captain-login"}
        className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg'
        >
          Sign in as Caption
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
