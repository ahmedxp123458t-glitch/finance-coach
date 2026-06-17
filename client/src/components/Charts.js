import React from 'react';

const Charts = ({ transactions }) => {
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const categories = [...new Set(transactions.map(t => t.category))];
  const catData = categories.map(c => ({ category: c, total: transactions.filter(t => t.category === c).reduce((s, t) => s + t.amount, 0) }));
  const maxCat = Math.max(...catData.map(d => d.total), 1);
  return (
    <div className="page">
      <h2>Charts</h2>
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Income vs Expenses</h3>
          <div className="bar-chart horizontal">
            <div className="bar-item"><span>Income</span><div className="bar-track"><div className="bar green" style={{ width: `${(income / Math.max(income, expense, 1)) * 100}%` }}></div></div><span>${income}</span></div>
            <div className="bar-item"><span>Expense</span><div className="bar-track"><div className="bar red" style={{ width: `${(expense / Math.max(income, expense, 1)) * 100}%` }}></div></div><span>${expense}</span></div>
          </div>
        </div>
        <div className="chart-card">
          <h3>By Category</h3>
          <div className="bar-chart vertical">
            {catData.map(d => (
              <div key={d.category} className="bar-item-v">
                <div className="bar-v" style={{ height: `${(d.total / maxCat) * 100}%` }}></div>
                <span>{d.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
