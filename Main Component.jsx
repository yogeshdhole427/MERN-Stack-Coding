import React, { useState } from 'react';
import MonthSelector from './MonthSelector';
import TransactionTable from './TransactionTable';
import TransactionStatistics from './TransactionStatistics';
import TransactionChart from './TransactionChart';
import { Container } from 'react-bootstrap';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to March

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <Container>
      <h1>Transaction Dashboard</h1>
      <MonthSelector selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      
      <TransactionStatistics month={selectedMonth} />
      <TransactionTable month={selectedMonth} />
      <TransactionChart month={selectedMonth} />
    </Container>
  );
};

export default App;
