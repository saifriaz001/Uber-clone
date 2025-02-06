import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {CaptainDataContext} from "../context/CaptainContext"


const CaptainProtectedWrapper = ({children}) => {
    const navigate = useNavigate();
    const [captain , setCaptain ] = useContext(CaptainDataContext);
    const [loading , isLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        if(!token){
            navigate("/captain-login")
            return;
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        }).then(response =>{
                if(response.status == 200){
                    setCaptain(response.data)
                    isLoading(false)
                }
            }).catch((err) => {
                console.log("not get token properly , cant navigate to profile page", err)
                navigate("/captain-login")
            });

    },[token])

    
    if(loading){

        return <div>...Loading</div>
    }

  return (
    <>
    {children}
    </>
  )
};

export default CaptainProtectedWrapper;
