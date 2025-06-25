const pool = require('../db');

// GET /loans
const getAllLoans = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT loans.*, b.title, br.name AS borrower_name, s.status_name
      FROM loans
      JOIN books b ON b.id = loans.book_id
      JOIN borrowers br ON br.id = loans.borrower_id
      JOIN loan_statuses s ON s.id = loans.status_id
      ORDER BY loans.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /loans/borrow
const borrowBook = async (req, res) => {
  const { borrower_id, book_id, borrow_date, return_deadline } = req.body;

  const client = await pool.connect();
  try {

    await client.query('BEGIN');

    // Validasi user ada
    const borrowerCheck = await client.query(`SELECT id FROM borrowers WHERE id = $1`, [borrower_id]);
    if (borrowerCheck.rowCount === 0) {
      throw new Error('User not found.');
    }

     // Validasi buku ada dan stock > 0
    const bookRes = await client.query(`SELECT id, stock FROM books WHERE id = $1`, [book_id]);
    if (bookRes.rowCount === 0) {
      throw new Error('Book not found.');
    }
    if (bookRes.rows[0].stock <= 0) {
      throw new Error('Book out of stock.');
    }

    // Cek apakah user sedang punya pinjaman aktif
    const activeLoan = await client.query(`
      SELECT id FROM loans
      WHERE borrower_id = $1 AND return_date IS NULL
    `, [borrower_id]);
    if (activeLoan.rowCount > 0) {
      throw new Error('Borrower has an active loan.');
    }

    // Validasi tanggal tidak boleh kurang dari hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0); // supaya hanya cek tanggal tanpa jam

    const borrowDateObj = new Date(borrow_date);
    const returnDeadlineObj = new Date(return_deadline);

    if (borrowDateObj < today) {
      throw new Error('Borrow date cannot be in the past.');
    }

    if (returnDeadlineObj < today) {
      throw new Error('Return deadline cannot be in the past.');
    }

    // Batas pinjam 30 hari
    const maxDate = new Date(borrowDateObj);
    maxDate.setDate(maxDate.getDate() + 30);
    if (returnDeadlineObj > maxDate) {
      throw new Error('Return deadline exceeds 30 days.');
    }

    // Insert pinjam buku
    const statusRes = await client.query(`SELECT id FROM loan_statuses WHERE status_name = 'borrowed'`);
    const status_id = statusRes.rows[0].id;

    await client.query(`
      INSERT INTO loans (borrower_id, book_id, borrow_date, return_deadline, status_id)
      VALUES ($1, $2, $3, $4, $5)
    `, [borrower_id, book_id, borrow_date, return_deadline, status_id]);

    // Update stok buku
    await client.query(`UPDATE books SET stock = stock - 1 WHERE id = $1`, [book_id]);

    await client.query('COMMIT');
    res.status(201).json({ message: 'Book borrowed successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};

// POST /loans/return
const returnBook = async (req, res) => {
  const { borrower_id, book_id, return_date } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const returnDateObj = new Date(return_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (returnDateObj < today) {
      throw new Error('Return date cannot be in the past.');
    }

    // Ambil loan aktif
    const loanRes = await client.query(`
      SELECT * FROM loans
      WHERE borrower_id = $1 AND book_id = $2 AND return_date IS NULL
    `, [borrower_id, book_id]);

    if (loanRes.rowCount === 0) {
      throw new Error('No active loan found for this book and borrower.');
    }

    const loan = loanRes.rows[0];

    // validasi jika tanggal return < tanggal pinjam
    const borrowDate = new Date(loan.borrow_date);
    if (returnDateObj < borrowDate) {
      throw new Error('Return date is not valid.');
    }

    // Tentukan status: returned atau late
    const deadlineDate = new Date(loan.return_deadline);

    const statusName = returnDateObj > deadlineDate ? 'late' : 'returned';
    const statusRes = await client.query(`SELECT id FROM loan_statuses WHERE status_name = $1`, [statusName]);
    const status_id = statusRes.rows[0].id;

    // Update loan
    await client.query(`
      UPDATE loans
      SET return_date = $1, status_id = $2
      WHERE id = $3
    `, [return_date, status_id, loan.id]);

    // Tambah stok buku kembali
    await client.query(`UPDATE books SET stock = stock + 1 WHERE id = $1`, [book_id]);

    await client.query('COMMIT');
    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};

module.exports = {
  getAllLoans,
  borrowBook,
  returnBook
};
