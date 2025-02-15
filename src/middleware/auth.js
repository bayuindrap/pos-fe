import React from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { sessionSelector } from "../redux/slicer/sessionSlicer";

const PrivateRoutes = () => {
  const sessionData = useSelector(sessionSelector);
  
  if (sessionData !== null && sessionData !== undefined) {
    if(Object.keys(sessionData).length > 1){
      return <Outlet />;
    } else {
      return <Navigate to="/login" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoutes