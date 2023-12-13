import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import DoughnutChart from '../components/dashboard/DoughnutChart'
import SplineChart from '../components/dashboard/SplineChart'
import FinancialStatus from '../components/dashboard/FinancialStatus'
import axios from 'axios'

const DashBoard = () => {


  return (
    <div className="flex w-Screen h-screen bg-slate-800 gap-5">
        <div className="w-1/5 h-screen ">
                <Sidebar />
        </div>
        <div className="w-4/5 h-[90%] mr-10 mt-7">
        <div className="w-full h-1/5">
                <FinancialStatus />
        </div>
        <div className="flex gap-5 h-4/5  justify-center items-center mb-10">
                <DoughnutChart />
                <SplineChart />
        </div>
        </div> 
    </div>
  )
}

export default DashBoard
