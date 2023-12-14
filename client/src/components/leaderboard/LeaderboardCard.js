import React from 'react'

const LeaderboardCard = (props) => {

    const {data,index} = props
  return (
    <>
    <div className="flex bg-black rounded-lg w-3/5 mt-1">
    <div className="bg-white rounded-full w-11  mt-3 mb-3 ml-6 mr-6 flex justify-center items-center text-3xl font-medium text-red-500">
     {index+1}
    </div>
    <div className=" m-2 w-3/5 flex  items-center ">
     <div className="text-red-500  m-2 text-2xl  font-medium overflow-hidden">
         {data.name}
     </div>
    </div>
    <div className="mt-2">
        <p className="text-red-500  bg-slate-800 rounded-xl w-fit px-2  ml-3 ">BALANCE</p>
        <p className=" text-red-500 text-2xl">₹ {data.balance}</p>
    </div>
    </div>
    </>
  )
}

export default LeaderboardCard
