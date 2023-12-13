import React,{ useState } from 'react'
import {RxDashboard} from "react-icons/rx"
import{GiExpense} from "react-icons/gi"
import {FaExchangeAlt} from "react-icons/fa"
import {MdLeaderboard} from "react-icons/md"
import {TbReportSearch} from "react-icons/tb"
import {FiLogOut} from "react-icons/fi"
import {FaRupeeSign} from "react-icons/fa"
import Premium from './Premium'
const Sidebar = () => {
  return (
    <div className=" bg-black flex flex-col text-yellow-400 font-medium h-full w-11/12 py-4 px-4 shadow-lg n">
      <div className="flex text-4xl items-center">
        <FaRupeeSign className="inline-block mr-2 text-4xl ml-4"/>
        <p>Tracker</p>
      </div>
      <div className="mt-10 flex flex-col  ">
        <div className="flex text-center pt-4 pb-4  text-xl items-center rounded-md hover:bg-slate-700">
          <RxDashboard className="inline-block mr-2 text-3xl ml-4" />
          Dashboard
        </div>
        <div className="flex text-center pt-4 pb-4 text-xl items-center rounded-md hover:bg-slate-700">
          <GiExpense className="inline-block mr-2 text-3xl ml-4" />
          Add Expense
        </div>
        <div className="flex text-center pt-4 pb-4 text-xl items-center rounded-md hover:bg-slate-700">
          <FaExchangeAlt className="inline-block mr-2 text-3xl ml-4" />
          Transactions
        </div>
        <div className="flex text-center pt-4 pb-4 text-xl items-center rounded-md hover:bg-slate-700">
          <MdLeaderboard className="inline-block mr-2 text-3xl ml-4 " />
          Leaderboard
        </div>
        <div className="flex text-center pt-4 pb-4 text-xl items-center rounded-md hover:bg-slate-700">
          <TbReportSearch className="inline-block mr-2 text-3xl ml-4" />
          Reports
        </div>
        <div className="flex text-center pt-4 pb-4 text-xl items-center rounded-md hover:bg-slate-700">
          <FiLogOut className="inline-block mr-2 text-3xl ml-4" />
          Logout
        </div>
        <div className="flex text-center mr-2 ml-4 mt-8 text-xl items-center ">
          <Premium />
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar
