const pool = require('./index');

const seedLoanStatuses = async () => {
  try {
    await pool.query(`
      INSERT INTO loan_statuses (status_name) VALUES
      ('borrowed'), ('returned'), ('late');
    `);
    console.log("✅ Loan statuses seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding loan statuses failed:", err);
    process.exit(1);
  }
};

seedLoanStatuses();
