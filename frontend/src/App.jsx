import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Start from './pages/Start'
import 'remixicon/fonts/remixicon.css'
import UserLogin from './pages/UserLogin'
import UserSignup from "./pages/UserSignup"
import  CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from "./pages/UserLogout"
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './components/CaptainRiding'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/riding" element={<UserProtectedWrapper> <Riding/> </UserProtectedWrapper>}/>
        <Route path ="/login" element={<UserLogin/>}/>
        <Route path ="/signup" element={<UserSignup/>}/>
        <Route path ="/captain-login" element={<CaptainLogin/>}/>
        <Route path ="/captain-signup" element={<CaptainSignup/>}/>
        <Route path ="/captain-home" element ={
          <CaptainProtectedWrapper>
          <CaptainHome/>
          </CaptainProtectedWrapper>}/>
          <Route path ="/captain-riding" element ={
          <CaptainProtectedWrapper>
          <CaptainRiding/>
          </CaptainProtectedWrapper>}/>
        <Route path ="/home" element={
        <UserProtectedWrapper>  
          <Home/>
        </UserProtectedWrapper>   }/>
        <Route path ="/user/logout" element ={
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>
        } 
        />
      </Routes>
    </div>
         
  )
}

export default App
