const pool = require('../db');

// GET /borrowers
const getAllBorrowers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, id_card_number, name, email FROM borrowers ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /borrowers
const createBorrower = async (req, res) => {
  const { id_card_number, name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO borrowers (id_card_number, name, email) VALUES ($1, $2, $3) RETURNING *',
      [id_card_number, name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBorrowers,
  createBorrower
};
