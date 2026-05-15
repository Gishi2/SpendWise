require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const expensesRouter = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expensesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'SpendWise API is running!' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected at:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
});