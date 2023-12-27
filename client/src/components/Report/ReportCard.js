import React from 'react'
import {useState} from 'react'
import classNames from 'classnames'

const Report = () => {

  const [reportType,setReportType] = useState('Monthly');
  const [expense,setExpense] = useState({
    date:'2023-12-27',
    Description:"dnnndbbdb",
    Amount:'5000',
    type:'expense'
  })
  return (
    <div className="flex flex-col  h-full w-full ">
    <div className="flex  justify-around w-full">
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl font-serif" onClick={()=>setReportType('Daily')}> Daily Report </button>
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl font-serif" onClick={()=>setReportType('Weekly')}> Weekly Report </button>
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl font-serif" onClick={()=>setReportType('Monthly')}> Monthly Report</button>
    </div>
    <h1 className="text-yellow-400 text-4xl flex font-serif  justify-center mt-7 mb-5">{reportType} Report </h1>
  <table className="bg-white  m-5 p-3 border-separate rounded-2xl">
    <thead className=" text-black font-serif text-2xl bg-yellow-300">
      <tr>
        <th className="py-2 px-4  text-left">Sl.No</th>
        <th className="py-2 px-4  text-left">Date</th>
        <th className="py-2 px-4  text-left">Description</th>
        <th className="py-2 px-4  text-left">Type</th>
        <th className="py-2 px-4  text-left">Amount</th>
      </tr>
    </thead>
    <tbody className="text-xl font-serif">
      <tr className={classNames({ 'bg-green-400': expense.type === 'income', 'bg-red-400': expense.type !== 'income' })}>
        <td className="py-2 px-4">1</td>
        <td className="py-2 px-4">2023-01-10</td>
        <td className="py-2 px-4">uhyjgiuyyiuyiu guiiuu hiuyuyk</td>
        <td className="py-2 px-4">income</td>
        <td className="py-2 px-4">5000</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default Report