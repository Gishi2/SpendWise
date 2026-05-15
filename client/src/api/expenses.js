const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/expenses';

export const getExpenses = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createExpense = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateExpense = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const getSummary = async () => {
  const res = await fetch(`${BASE_URL}/summary`);
  return res.json();
};