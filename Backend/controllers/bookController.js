const pool = require('../db');

// GET /books
const getAllBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, isbn, stock FROM books ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /books
const createBook = async (req, res) => {
  const { title, isbn, stock } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, isbn, stock) VALUES ($1, $2, $3) RETURNING *',
      [title, isbn, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBooks,
  createBook
};
