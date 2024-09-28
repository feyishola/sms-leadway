import React from 'react'
import useAuthStatus from '../hooks/useauthstatus';
import { Outlet,Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const {isLoggedIn, isLoading} = useAuthStatus();

    if(isLoading)
        <div>Loading....!!!!</div>

  return (
    <div>
        
        {isLoggedIn ? <Outlet/> : <Navigate to={"/"}/>} 
    </div>
  )
}

export default PrivateRoutes