import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import { getExpenses, createExpense, updateExpense, deleteExpense, getSummary } from './api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchAll = async () => {
    const [expensesData, summaryData] = await Promise.all([getExpenses(), getSummary()]);
    setExpenses(expensesData);
    setSummary(summaryData);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (form) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, form);
      setEditingExpense(null);
    } else {
      await createExpense(form);
    }
    fetchAll();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">💸 SpendWise</h1>
        <ExpenseForm
          onSubmit={handleSubmit}
          editingExpense={editingExpense}
          onCancel={() => setEditingExpense(null)}
        />
        <ExpenseList
          expenses={expenses}
          onEdit={setEditingExpense}
          onDelete={handleDelete}
        />
        <ExpenseSummary summary={summary} />
      </div>
    </div>
  );
}

export default App;