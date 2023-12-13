import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
    const dataSet = {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
        datasets: [
          {
            data: [30, 25, 20, 15], // Numeric values representing the data for each category
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Background colors for each segment
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Background colors on hover
          },
        ],
      };
    ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <div className="bg-black text-white w-2/5 h-2/3 rounded-xl  flex justify-center items-center ">
      <Doughnut data={dataSet}  />
    </div>
  )
}

export default DoughnutChart
