import React from 'react';
import Select from 'react-select';

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  return (
    <Select
      value={months.find(month => month.value === selectedMonth)}
      onChange={(e) => onMonthChange(e.value)}
      options={months}
      className="month-selector"
    />
  );
};

export default MonthSelector;
