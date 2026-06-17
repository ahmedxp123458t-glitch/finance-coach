import React from 'react';

const Reports = ({ transactions, budgets }) => {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const net = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((net / totalIncome) * 100).toFixed(1) : 0;
  return (
    <div className="page">
      <h2>Monthly Financial Report</h2>
      <div className="report-grid">
        <div className="report-card"><h3>Total Income</h3><p className="income">${totalIncome}</p></div>
        <div className="report-card"><h3>Total Expenses</h3><p className="expense">${totalExpense}</p></div>
        <div className="report-card"><h3>Net Savings</h3><p className={net >= 0 ? 'income' : 'expense'}>${net}</p></div>
        <div className="report-card"><h3>Savings Rate</h3><p>{savingsRate}%</p></div>
        <div className="report-card"><h3>Transactions</h3><p>{transactions.length}</p></div>
        <div className="report-card"><h3>Budget Categories</h3><p>{budgets.length}</p></div>
      </div>
    </div>
  );
};

export default Reports;
