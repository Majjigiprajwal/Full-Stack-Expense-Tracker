import React, { useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Transactions from '../components/Transactions/Transactions'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {useState} from 'react'
import axios from 'axios'
import classNames from 'classnames'

const AllTransactions = () => {

  const [transactions,setTransactions] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const [hasPrevious,setHasPrevious] = useState(false)
  const [hasNext,setHasNext] = useState(false)
  const [totalPages,setTotalPages] = useState(null)


  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(()=>{
     
    const fetchData = async ()=>{
      try{
         let {data :{data,hasNext,hasPrevious,pages}} = await axios.get(`http://localhost:4000/transactions?page=${currentPage}`,{
          headers : {
            'Authorization' : `Bearer ${token}`
          }
         })
        setTransactions(()=>data)
        setHasNext(hasNext)
        setHasPrevious(hasPrevious)
        setTotalPages(pages)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
    
  },[currentPage,token])

    const deleteTransaction = async (transactionId,amount,type)=>{
      console.log(transactionId)
        try{
          await axios.delete(`http://localhost:4000/deleteTransaction/${transactionId}?amount=${amount}&type=${type}`,{
            headers : {
              'Authorization' : `Bearer ${token}`
            }
           })
           const updatedTransaction = transactions.filter((transaction)=>transaction.id!==transactionId)
           setTransactions(()=>updatedTransaction)
        }
        catch(error){

        }
    }

    const handleForwardClick = ()=>{
      if(hasNext){
        setCurrentPage((prevPage)=>prevPage+1)
      }
    }

    const handleBackwardClick = ()=>{
      if(hasPrevious){
        setCurrentPage((prevPage)=>prevPage-1)
      }
    }
  
   
  return (
    <div className="bg-slate-800 flex w-full min-h-screen">
      <div className="min-h-screen w-1/5" >
        <Sidebar />
      </div>
      <div className="w-full h-full mt-5 flex flex-col justify-center items-center">
        <h1 className="font-serif text-yellow-400 text-4xl mb-5">Transactions</h1>
       {
        transactions.map((transaction)=>{
          return <Transactions key={transaction.id} data={transaction} handleDelete={deleteTransaction} />
        })
       }
       <div className="flex justify-center items-center gap-10 text-xl mt-5 ">
        <button className={classNames('rounded-full','p-2',{'hover:bg-yellow-300 bg-white':hasPrevious,"bg-slate-400":!hasPrevious})} disabled={!hasPrevious} onClick={()=>{handleBackwardClick()}}><MdOutlineArrowBackIos className="text-2xl text-black" /></button>
        <div className="text-white text-2xl ">{currentPage} of {totalPages}</div>
        <button className={classNames('rounded-full','p-2',{'hover:bg-yellow-300 bg-white':hasNext,'bg-slate-400':!hasNext})} disabled={!hasNext} onClick={()=>{handleForwardClick()}}><MdOutlineArrowForwardIos className="text-2xl text-black"  /></button>
      </div>
      </div>
      
    </div>
  )
}

export default AllTransactions
