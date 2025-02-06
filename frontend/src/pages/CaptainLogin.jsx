import React ,{useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import  {CaptainDataContext }  from "../context/CaptainContext"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CaptainLogin = () => {
  const navigate = useNavigate()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')


    const  [captain , setCaptain] = useContext(CaptainDataContext)  


    const submitHandler =async(e)=>{
      e.preventDefault()
      const  captain ={
        email:email, password:password
      }
      console.log("printing the url ->" , import.meta.env.VITE_BASE_URL)
      try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
        if (response.status == 200){
          console.log("printing the  response ->" ,response)
          const data = response.data
          setCaptain(data.captain)
          localStorage.setItem("token", data.token)
          navigate("/captain-home")
        }

      }catch(error){
        console.log("error getting post the data" , error)

      }

      setEmail('')
      setPassword('')
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


        <p className='text-center'> Join a fleet?  {''}
        <Link to={'/captain-signup'} className=' text-blue-600  '>
        Register as a Captain      
        </Link>
        </p>



      </form>
      </div>
      <div>
        <Link 
        to={"/login"}
        className='bg-[#d5622d] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}


export default CaptainLogin
