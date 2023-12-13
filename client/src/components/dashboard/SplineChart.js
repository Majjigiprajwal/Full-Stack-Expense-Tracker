import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";


const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Expense',
        data: [500, 600, 700, 800, 900, 1000, 400, 500, 600, 100, 400,300],
        borderColor: 'rgba(255, 0, 0, 1)',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: 'origin',
        borderWidth:1, 
        cubicInterpolationMode:'monotone'
      },
      {
        label: 'Income',
        data: [1000, 800, 1200, 900, 1500, 1100, 700, 600, 400, 500, 600, 700],
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: 'origin',
        borderWidth: 1,
        cubicInterpolationMode:'monotone'
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
        line: {
          fill: 'origin',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
            grid: {
              display: false,
            },
          },
    }
  };
  
const SplineChart = () => {
   
  return (
    <div className="w-3/5 h-2/3 bg-white rounded-xl flex justify-center items-center ">
    <Line data={data} options={options} />
    </div>
  )
}

export default SplineChart
