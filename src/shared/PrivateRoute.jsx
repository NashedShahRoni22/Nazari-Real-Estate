import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const accessToken = localStorage.getItem("oatAccessToken")
    return accessToken === "@oataccess2024" ? children : <Navigate to='/login'/> ;
}
