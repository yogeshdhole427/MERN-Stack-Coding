import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, FormControl } from 'react-bootstrap';

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  
  useEffect(() => {
    fetchTransactions();
  }, [month, page, searchText]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions`, {
        params: { month, page, search: searchText },
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Search Transactions"
        value={searchText}
        onChange={handleSearchChange}
      />
      <Button onClick={handleClearSearch}>Clear Search</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <div className="pagination-controls">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default TransactionTable;
