import React from 'react'
import Banner from "../images/banner.jpeg"
import Login from './Login'
const Achalogin = () => {
  return (
    <div>
      <div 
      // className="home"
       className="relative w-full h-screen bg-cover bg-center filter blur-sm brightness-75"
       style={{ backgroundImage: `url(${Banner})` }}
       >
         {/* Overlay to center the Login form */}
      <div className="absolute inset-0 flex justify-center items-center z-10 ">
        <Login />
      </div>
      <image>

      </image>


      </div>
    </div>
  )
}

export default Achalogin

