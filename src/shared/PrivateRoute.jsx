import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const accessToken = localStorage.getItem("oaAccessToken")
    return accessToken ? children : <Navigate to='/login'/> ;
}
