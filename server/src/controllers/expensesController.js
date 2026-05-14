const pool = require('../db/db');

const getAllExpenses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (title, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, amount, category, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE expenses SET title=$1, amount=$2, category=$3, date=$4 WHERE id=$5 RETURNING *',
      [title, amount, category, date, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM expenses WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted', expense: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT category, SUM(amount) AS total FROM expenses GROUP BY category ORDER BY total DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllExpenses, createExpense, updateExpense, deleteExpense, getSummary };