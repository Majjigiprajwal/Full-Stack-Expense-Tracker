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
  const [itemsPerPage,setItemsPerpage] = useState(null)


  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(()=>{
    setItemsPerpage(()=>Number(JSON.parse(localStorage.getItem('itemsPerPage'))))
    console.log(itemsPerPage)
  },[])

  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        console.log(itemsPerPage)
         let {data :{data,hasNext,hasPrevious,pages}} = await axios.get(`http://localhost:4000/transactions?page=${currentPage}&limit=${itemsPerPage}`,{
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
  },[currentPage,token,itemsPerPage])


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

    const handleitemsPerPageChange = (e)=>{
      window.localStorage.setItem('itemsPerPage',JSON.stringify(e.target.value))
      setItemsPerpage(e.target.value)
      setCurrentPage(1)
    }
  
   
  return (
    <div className="bg-slate-800 flex w-full min-h-screen">
      <div className="min-h-screen w-1/5" >
        <Sidebar />
      </div>
      <div className="w-full h-full mt-5 flex flex-col justify-center items-center text-xl">
        <h1 className="font-serif text-yellow-400 text-4xl mb-5">Transactions</h1>
        <div className="flex justify-end items-center gap-4">
        <label className="text-white">Items per page:</label>
      <select
        className="border border-gray-300 p-1 rounded-md text-white bg-black"
        value={itemsPerPage}
        onChange={handleitemsPerPageChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      </div>
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
