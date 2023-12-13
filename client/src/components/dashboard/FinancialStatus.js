import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'

const FinancialStatus = () => {
  return (
    <div className="flex justify-between items-center gap-20 h-full w-full  ">
    <div className=" bg-black flex gap-1 w-2/5 h-4/5  rounded-2xl ">
       <div className=" w-1/3 h-full  text-yellow-400 text-5xl pt-5  flex items-center justify-center ">
       <FaRupeeSign />
       </div>
       <div className="text-4xl w-2/3  flex flex-col items-center justify-center text-white ">
         <p className="text-yellow-400 bg-slate-500 pl-2 pr-2  rounded-xl w-fit  ml-3 font-medium text-sm ">INCOME</p>
          <p className="text-green-400">0</p>
       </div>
    </div>
    <div className=" bg-black flex w-2/5 h-4/5  rounded-2xl ">
       <div className=" w-1/3 h-full  text-yellow-400 text-5xl pt-5   flex items-center justify-center ">
       <FaRupeeSign />
       </div>
       <div className="text-4xl w-2/3  flex flex-col items-center justify-center text-white ">
         <p className="text-yellow-400 bg-slate-500 pl-2 pr-2 rounded-xl w-fit  ml-3 font-medium text-sm ">EXPENSE</p>
          <p className="text-red-400">0</p>
       </div>
    </div>
    <div className=" bg-black flex w-2/5 h-4/5  rounded-2xl ">
       <div className=" w-1/3 h-full  text-yellow-400 text-5xl pt-5   flex items-center justify-center ">
       <FaRupeeSign />
       </div>
       <div className="text-4xl w-2/3  flex flex-col items-center justify-center text-white ">
         <p className="text-yellow-400 bg-slate-500 pl-2 pr-2 rounded-xl w-fit  ml-3 font-medium text-sm ">BALANCE</p>
          <p className="text-yellow-400">0</p>
       </div>
    </div>
    
   
    
    </div>
  )
}

export default FinancialStatus
