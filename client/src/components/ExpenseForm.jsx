import { useState, useEffect } from 'react';

function ExpenseForm({ onSubmit, editingExpense, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date.split('T')[0],
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', amount: '', category: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingExpense ? 'Edit Expense' : 'Add Expense'}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="border rounded-lg p-2 col-span-2"
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          required
          className="border rounded-lg p-2"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="border rounded-lg p-2"
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          required
          className="border rounded-lg p-2 col-span-2"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {editingExpense ? 'Update' : 'Add'}
        </button>
        {editingExpense && (
          <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;