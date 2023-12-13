import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { useState } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import { toast } from 'react-toastify';

const AddExpense = () => {

  const [isIncome,setIsIncome] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'))

  const [transaction,setTransaction] = useState({
    description:null,
    amount :0,
    transactionType :'expense',
    date :null,
    category:null
  })

  const handleOnchange = (e)=>{
   setTransaction((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
   console.log(transaction)
  }

  const dynamicClassIncome = classNames('w-full','h-full','p-2','rounded-lg','font-medium',{
    'bg-yellow-400' : isIncome,
    'text-black' : isIncome,
    'bg-white' :!isIncome,
  })

  const dynamicClassExpense = classNames('w-full','h-full','p-2','rounded-lg','font-medium',{
    'bg-yellow-400' : !isIncome,
    'text-black' : !isIncome,
    'bg-white' :isIncome,
  })

  const incomeHandleClick = ()=>{
    setTransaction((prevState)=>({...prevState,transactionType:'income'}))
    setIsIncome(true)
    console.log(transaction)
  }

  const expenseHandleClick = ()=>{
    setTransaction((prevState)=>({...prevState,transactionType:'expense'}))
    setIsIncome(false)
    console.log(transaction)
  }

  const saveTransaction = async ()=>{
    try{
      const {data} = await  axios.post('http://localhost:4000/add-transaction',{transaction},
      {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    catch(error){
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    }
    
  }


  return (
    <div className="bg-black w-4/5 h-10/12 rounded-lg  p-4">
      <div className="flex justify-center items-center">
      <div className="relative flex w-3/5 h-3/12 justify-center items-center h-4/12 text-xl border-solid  rounded-lg border-yellow-400">
        <button className={dynamicClassIncome}  onClick={incomeHandleClick}>Add Income</button>
        <button className={dynamicClassExpense}   onClick={expenseHandleClick}>Add Expense</button>
      </div>
      </div>
     {isIncome ?(<div className="flex flex-col mt-2" >
    
    <div className=" text-white text-4xl flex  items-center m-5 ">
      <FaRupeeSign />
      <input className="p-3 bg-black text-4xl w-2/4 border-b-2 outline-none "
       placeholder="0" type="number" onChange={(e)=>{handleOnchange(e)}} name="amount"></input>
    </div>
    <input className="p-3 px-4 text-2xl font-medium rounded-md ml-12 mt-2 w-2/4 placeholder-yellow-400 bg-slate-700 outline-none text-white" name="description" placeholder="where was the income from?" onChange={(e)=>{handleOnchange(e)}}></input>
    <input className="p-3 px-4 text-xl font-medium rounded-md mt-4 ml-12 w-1/4 placeholder-yellow-400 bg-slate-700 outline-none text-white" placeholder="Date" name="date" type="date" onChange={(e)=>{handleOnchange(e)}}></input>
    <div className="ml-12 mt-2">
          <h1 className="text-white  font-bold text-xl  mt-4">Category</h1>
        </div>
        <div className="text-black ml-12 mt-2">
          <select className="bg-slate-700 text-white px-3 text-xl py-2 my-1 rounded" name="category" id="categories" onChange={(e)=>{handleOnchange(e)}}>
            <option value="General">Others</option>
            <option value="Food">Salary</option>
            <option value="Fuel">Investments</option>
            <option value="Fuel">Rental Income</option>
          </select>
        </div>
        <button className="font-medium max-w-fit ml-12 mt-5 rounded-lg text-yellow-400 py-4 px-4 text-xl border border-yellow-400" onClick={saveTransaction}>
              Save Income
        </button>
  </div>):(<div className="flex flex-col mt-2" >
      <div className=" text-white text-4xl flex  items-center m-5 ">
        <FaRupeeSign />
        <input className="p-3 bg-black text-4xl w-2/4 border-b-2 outline-none [appearance:none] "
         placeholder="0" type="number" name="amount" onChange={(e)=>{handleOnchange(e)}}></input>
      </div>
      <input className="p-3 px-4 text-2xl font-medium rounded-md ml-12 mt-2 w-2/4 placeholder-yellow-400 bg-slate-700 outline-none text-white" name="description" placeholder="what was this expense for ?" onChange={(e)=>{handleOnchange(e)}}></input>
      <input className="p-3 px-4 text-xl font-medium rounded-md mt-4 ml-12 w-1/4 placeholder-yellow-400 bg-slate-700 outline-none text-white" name="date" placeholder="Date" type="date" onChange={(e)=>{handleOnchange(e)}}></input>
      <div className="ml-12 mt-2">
            <h1 className="text-white  font-bold text-xl  mt-4">Category</h1>
          </div>
          <div className="text-black ml-12 mt-2">
            <select className="bg-slate-700 text-white px-3 text-xl py-2 my-1 rounded" name="category" id="categories" onChange={(e)=>{handleOnchange(e)}}>
              <option value="General">General</option>
              <option value="Food">Food</option>
              <option value="Fuel">Fuel</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <button className="font-medium max-w-fit ml-12 mt-5 rounded-lg text-yellow-400 py-4 px-4 text-xl border border-yellow-400" onClick={saveTransaction}>
                Save Expense
          </button>
    </div>
    )
    }
    </div>
  )
}

export default AddExpense
