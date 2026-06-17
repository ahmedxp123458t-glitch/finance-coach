import React from 'react';

const ExpenseList = ({ transactions, setTransactions, onDelete }) => (
  <div className="page">
    <h2>Transactions</h2>
    <div className="table-container">
      <table>
        <thead>
          <tr><th>Type</th><th>Category</th><th>Amount</th><th>Date</th><th>Description</th><th>Action</th></tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td><span className={`badge ${t.type}`}>{t.type}</span></td>
              <td>{t.category}</td>
              <td className={t.type === 'income' ? 'income' : 'expense'}>${t.amount}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.description}</td>
              <td><button className="btn-delete" onClick={() => onDelete(t._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ExpenseList;
