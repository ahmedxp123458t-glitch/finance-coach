import React from 'react';

const SavingsGoal = ({ goals }) => (
  <div className="page">
    <h2>Savings Goals</h2>
    <div className="goals-grid">
      {goals.map(g => {
        const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
        return (
          <div key={g._id} className="goal-card">
            <h3>{g.name}</h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${pct}%` }}></div>
            </div>
            <div className="goal-info">
              <span>${g.currentAmount} / ${g.targetAmount}</span>
              <span>{pct}%</span>
            </div>
            <p className="deadline">Deadline: {new Date(g.deadline).toLocaleDateString()}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default SavingsGoal;
