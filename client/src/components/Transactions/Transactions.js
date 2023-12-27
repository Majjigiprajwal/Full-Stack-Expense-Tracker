import React from 'react'
import Money from '../../assets/money.png'
import classNames from 'classnames'

const Transactions = ({data,handleDelete}) => {
  const {description,amount,date,transactionType,category,id} = data

  const dynamicClass = classNames('flex bg-slate-800 rounded-xl w-fit px-2 py-1 ml-3 font-medium',{
     'text-green-400': transactionType === 'income',
     'text-red-400' : transactionType === 'expense'
  })
  return ( 
    <div className="flex bg-black rounded-lg w-3/5 mt-1">
       <div className="bg-slate-800 rounded-full p-1 m-3 flex justify-center items-center">
        <img src={Money} alt="Money"/>
       </div>
       <div className=" m-2 w-3/5 ">
        <div className="flex">
          <div className="flex text-yellow-400 bg-slate-800 rounded-xl w-fit px-2 py-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm  ml-1 font-medium">
             {date}
            </p>
          </div>
          <div className="flex text-yellow-400 bg-slate-800 rounded-xl w-fit px-2 py-1 ml-3 font-medium ">
            <p className="text-sm  ml-1">{category}</p>
          </div>
          <div className={dynamicClass}>
            <p className="text-sm  ml-1">{transactionType}</p>
          </div>
        </div> 
        <div className="text-white mt-2 text-lg  font-medium overflow-hidden">
            {description}
        </div>
    </div>
    <div className="m-2 text-white font-medium text-xl w-2/12">
        <p className="text-yellow-400">Amount</p>
        <p className="mt-2">₹ {amount}</p>
    </div>
    <div className="text-yellow-400 w-1/12 p-3 ml-2 flex  justify-center items-center">
    <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hover:scale-110"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={()=>{handleDelete(id,amount,transactionType)}}
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
    </div>
    </div>
    
  )
}

export default Transactions

