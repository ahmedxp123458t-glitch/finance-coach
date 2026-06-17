import React from 'react';

const Navbar = ({ page, setPage }) => (
  <nav className="navbar">
    <div className="nav-brand">Finance Coach</div>
    <div className="nav-links">
      <button className={page === 'expenses' ? 'active' : ''} onClick={() => setPage('expenses')}>Expenses</button>
      <button className={page === 'add' ? 'active' : ''} onClick={() => setPage('add')}>Add Transaction</button>
      <button className={page === 'savings' ? 'active' : ''} onClick={() => setPage('savings')}>Savings</button>
      <button className={page === 'budgets' ? 'active' : ''} onClick={() => setPage('budgets')}>Budgets</button>
      <button className={page === 'charts' ? 'active' : ''} onClick={() => setPage('charts')}>Charts</button>
      <button className={page === 'reports' ? 'active' : ''} onClick={() => setPage('reports')}>Reports</button>
    </div>
  </nav>
);

export default Navbar;
