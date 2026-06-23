import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseChart from './components/ExpenseChart';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/transactions');
      setTransactions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = { text, amount: parseFloat(amount), category };
    try {
      const res = await axios.post('http://localhost:5000/api/v1/transactions', newTransaction);
      setTransactions([res.data.data, ...transactions]);
      setText('');
      setAmount('');
    } catch (err) {
      console.error(err);
    }
  };

  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Expense Tracker</h2>
      
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h4>Your Balance</h4>
        <h1>₹{total}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <h5>Income</h5>
            <p style={{ color: 'green', fontWeight: 'bold' }}>+₹{income}</p>
          </div>
          <div>
            <h5>Expense</h5>
            <p style={{ color: 'red', fontWeight: 'bold' }}>-₹{expense}</p>
          </div>
        </div>
      </div>

      <ExpenseChart transactions={transactions} />

      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Description</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Amount (negative = expense, positive = income)</label>
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
            <option value="Food">Food</option>
            <option value="Investment">Investment</option>
            <option value="Fitness">Fitness</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button style={{ width: '100%', padding: '10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Transaction</button>
      </form>

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;