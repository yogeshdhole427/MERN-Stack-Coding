import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`/api/transaction-statistics`, {
          params: { month }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h3>Transaction Statistics</h3>
      <div>Total Sale Amount: ${statistics.totalSaleAmount}</div>
      <div>Total Sold Items: {statistics.totalSoldItems}</div>
      <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
    </div>
  );
};

export default TransactionStatistics;
