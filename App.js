import React, { useState } from 'react';
import './App.css';
import logo from './bull.png';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  // Handle adding a new transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();

    // Validation
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }

    // Create new transaction
    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type: type,
    };

    // Add to transactions list
    setTransactions([...transactions, newTransaction]);

    // Reset form
    setDescription('');
    setAmount('');
    setType('income');
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="app-container">
      <div className="app-header">
        <img src="/bull.png" alt="Expense Tracker Logo" className="app-logo" />
        <h1>Expense Tracker</h1>
        <p>Track your income and expenses efficiently</p>
      </div>

      <div className="main-content">
        {/* Summary Section */}
        <div className="summary-section">
          <div className="summary-card balance">
            <h3>Total Balance</h3>
            <p className={balance >= 0 ? 'positive' : 'negative'}>
              ₹{balance.toFixed(2)}
            </p>
          </div>
          <div className="summary-card income">
            <h3>Total Income</h3>
            <p className="positive">₹{totalIncome.toFixed(2)}</p>
          </div>
          <div className="summary-card expense">
            <h3>Total Expenses</h3>
            <p className="negative">₹{totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <h2>Add Transaction</h2>
          <form onSubmit={handleAddTransaction}>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                placeholder="e.g., Salary, Groceries"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <button type="submit" className="btn-add">
              Add Transaction
            </button>
          </form>
        </div>

        {/* Transaction List Section */}
        <div className="transactions-section">
          <h2>Transactions</h2>
          {transactions.length === 0 ? (
            <p className="no-transactions">No transactions yet. Add one to get started!</p>
          ) : (
            <div className="transactions-list">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`transaction-item ${transaction.type}`}
                >
                  <div className="transaction-info">
                    <h4>{transaction.description}</h4>
                    <p className="transaction-type">
                      {transaction.type === 'income' ? '➕ Income' : '➖ Expense'}
                    </p>
                  </div>
                  <div className="transaction-amount">
                    <span className={transaction.type === 'income' ? 'positive' : 'negative'}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                    </span>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
