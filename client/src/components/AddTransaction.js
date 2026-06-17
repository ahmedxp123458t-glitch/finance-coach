import React, { useState } from 'react';

const AddTransaction = ({ onAdd }) => {
  const [form, setForm] = useState({ userId: '000000000000000000000000', type: 'expense', category: '', amount: '', date: '', description: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, amount: Number(form.amount), date: form.date || undefined });
    setForm({ userId: '000000000000000000000000', type: 'expense', category: '', amount: '', date: '', description: '' });
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

export default AddTransaction;
