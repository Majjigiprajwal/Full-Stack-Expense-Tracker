 import React, { useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Transactions from '../components/Transactions/Transactions'
import {useState} from 'react'
import axios from 'axios'

const AllTransactions = () => {

  const [transactions,setTransactions] = useState([]);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(()=>{
     
    const fetchData = async ()=>{
      try{
         let {data :{data}} = await axios.get('http://localhost:4000/transactions',{
          headers : {
            'Authorization' : `Bearer ${token}`
          }
         })
        setTransactions(()=>data)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
    
  },[])
  
   
  return (
    <div className="bg-slate-800 flex w-full min-h-screen">
      <div className="min-h-screen w-1/5" >
        <Sidebar />
      </div>
      <div className="w-full h-full mt-5 flex flex-col justify-center items-center">
       {
        transactions.map((transaction)=>{
          return <Transactions key={transaction.id} data={transaction} />
        })
       }
       
      </div>
    </div>
  )
}

export default AllTransactions
