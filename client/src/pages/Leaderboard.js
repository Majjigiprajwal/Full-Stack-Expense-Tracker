import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import LeaderboardCard from '../components/leaderboard/LeaderboardCard'

const Leaderboard = () => {

    const [leaderboard,setLeaderboard] = useState([]);

    useEffect(()=>{
          const fetchLeaderboard = async ()=>{
              const {data :{data}} = await axios.get('http://localhost:4000/leaderboard')

              setLeaderboard(()=>data)
          }
          fetchLeaderboard()
    },[])
    console.log(leaderboard)
  return (
    <div className="bg-slate-800 flex w-full min-h-screen">
    <div className="min-h-screen w-1/5" >
      <Sidebar />
    </div>
    <div className="w-full h-full mt-5 flex flex-col justify-center items-center">
    <div className="text-4xl flex justify-center  text-yellow-300 m-2">
        <h1>LEADERBOARD</h1>
    </div>
        {
          leaderboard && leaderboard.map((member,index)=>{
                return <LeaderboardCard data={member} index={index} />
            })
        }
    </div>
  </div>
  )
}

export default Leaderboard