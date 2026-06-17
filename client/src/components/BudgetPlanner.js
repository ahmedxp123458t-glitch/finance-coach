import React from 'react';

const BudgetPlanner = ({ budgets }) => (
  <div className="page">
    <h2>Budget Planner</h2>
    <div className="budget-list">
      {budgets.map(b => {
        const pct = Math.min(100, Math.round((b.spent / b.monthlyLimit) * 100));
        const over = b.spent > b.monthlyLimit;
        return (
          <div key={b._id} className="budget-item">
            <div className="budget-header">
              <h3>{b.category}</h3>
              <span className={over ? 'over' : ''}>${b.spent} / ${b.monthlyLimit}</span>
            </div>
            <div className="progress-bar-container">
              <div className={`progress-bar ${over ? 'over' : ''}`} style={{ width: `${pct}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default BudgetPlanner;
