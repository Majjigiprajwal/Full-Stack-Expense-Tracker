import React from 'react'

const Report = () => {
  return (
    <div className="flex flex-col  h-full w-full ">
    <div className="flex  justify-around w-full">
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl"> Daily Report </button>
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl"> Weekly Report </button>
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl"> Monthly Report</button>
    </div>
    <h1 className="text-yellow-400 text-4xl flex  justify-center mt-7 mb-5">Monthly Report </h1>
  <table className="bg-black  m-5 ">
    <thead className="bg-yellow-400  text-xl text-black">
      <tr>
        <th className="py-2 px-4  text-left">Sl.No</th>
        <th className="py-2 px-4  text-left">Date</th>
        <th className="py-2 px-4  text-left">Description</th>
        <th className="py-2 px-4  text-left">Type</th>
        <th className="py-2 px-4  text-left">Amount</th>
      </tr>
    </thead>
    <tbody className="text-xl font-thin">
      <tr className=" text-white ">
        <td className="py-2 px-4">1</td>
        <td className="py-2 px-4">2023-01-10</td>
        <td className="py-2 px-4">uhyguf jhjihf dhgfjidf gfiudf ihgff</td>
        <td className="py-2 px-4">income</td>
        <td className="py-2 px-4">5000</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default Report