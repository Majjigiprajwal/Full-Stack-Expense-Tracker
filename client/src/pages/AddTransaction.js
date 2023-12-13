import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import AddExpense from '../components/AddExpense/AddExpense'

const AddTransaction = () => {
  return (
    <div className="bg-slate-800 flex w-full min-h-screen">
      <div className="h-screen w-1/5" >
        <Sidebar />
      </div>
      <div className="w-4/5 h-full mt-5 ml-10">
       <AddExpense />
      </div>
    </div>
  )
}

export default AddTransaction
