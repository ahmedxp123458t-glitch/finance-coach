import React from 'react';

const App = () => {
  const [page, setPage] = React.useState('expenses');
  const [transactions, setTransactions] = React.useState([]);
  const [savingsGoals, setSavingsGoals] = React.useState([]);
  const [budgets, setBudgets] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/transactions').then(r => r.json()).then(setTransactions).catch(() => {});
    fetch('/api/savings').then(r => r.json()).then(setSavingsGoals).catch(() => {});
    fetch('/api/budgets').then(r => r.json()).then(setBudgets).catch(() => {});
  }, []);

  const Navbar = () => (
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

  const ExpenseList = () => (
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
                <td><button className="btn-delete" onClick={() => { fetch(`/api/transactions/${t._id}`, { method: 'DELETE' }); setTransactions(transactions.filter(x => x._id !== t._id)); }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AddTransaction = () => {
    const [form, setForm] = React.useState({ userId: '000000000000000000000000', type: 'expense', category: '', amount: '', date: '', description: '' });
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch('/api/transactions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, amount: Number(form.amount), date: form.date || undefined }) })
        .then(r => r.json()).then(t => { setTransactions([t, ...transactions]); setForm({ userId: '000000000000000000000000', type: 'expense', category: '', amount: '', date: '', description: '' }); });
    };
    return (
      <div className="page">
        <h2>Add Transaction</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="income">Income</option><option value="expense">Expense</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Food, Salary" required />
          </div>
          <div className="form-group">
            <label>Amount ($)</label>
            <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0.00" required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Optional" />
          </div>
          <button type="submit" className="btn-primary">Add Transaction</button>
        </form>
      </div>
    );
  };

  const SavingsGoal = () => (
    <div className="page">
      <h2>Savings Goals</h2>
      <div className="goals-grid">
        {savingsGoals.map(g => {
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

  const BudgetPlanner = () => (
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

  const Charts = () => {
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

  const Reports = () => {
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

  const renderPage = () => {
    switch (page) {
      case 'expenses': return <ExpenseList />;
      case 'add': return <AddTransaction />;
      case 'savings': return <SavingsGoal />;
      case 'budgets': return <BudgetPlanner />;
      case 'charts': return <Charts />;
      case 'reports': return <Reports />;
      default: return <ExpenseList />;
    }
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
};

export default App;
