import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';

const TransactionChart = ({ month }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`/api/transaction-chart`, {
          params: { month }
        });

        const data = {
          labels: response.data.priceRanges,
          datasets: [{
            label: 'Items Sold',
            data: response.data.itemCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    fetchChartData();
  }, [month]);

  return (
    <div>
      <h3>Transaction Bar Chart</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionChart;
