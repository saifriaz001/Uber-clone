import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const UserProtectedWrapper = ({ children }) => {
  const [user , setUser ] = useContext(UserDataContext);
  const [loading , isLoading] = useState(true)
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((response) =>{
      if (response.status == 200){
        setUser(response.data)
        console.log("printing the response of userdata- >", user)
        isLoading(false)
      }
    })
    .catch(err =>{
      console.log(err)

      navigate('/login')
    })
  }
  

  , [ token]);


  if (loading){
    return <div>...Loading</div>
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
