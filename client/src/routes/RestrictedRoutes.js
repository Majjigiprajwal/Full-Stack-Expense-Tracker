import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { usePremium } from '../context/PremiumContext';

const RestrictedRoutes = () => {

    const {isPremium} = usePremium()
  return (
    <div>
    {isPremium ? (
         <Navigate to="/dashboard" />
    ) : (
      <Outlet />
    )}
  </div>
  )
}

export default RestrictedRoutes
