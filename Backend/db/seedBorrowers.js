const pool = require('./index');

const seedBorrowers = async () => {
  try {
    await pool.query(`
      INSERT INTO borrowers (id_card_number, name, email) VALUES
      ('ID10001', 'Alice Johnson', 'alice@example.com'),
      ('ID10002', 'Bob Smith', 'bob@example.com'),
      ('ID10003', 'Charlie Brown', 'charlie@example.com'),
      ('ID10004', 'Diana Prince', 'diana@example.com'),
      ('ID10005', 'Ethan Hunt', 'ethan@example.com'),
      ('ID10006', 'Fiona Gallagher', 'fiona@example.com'),
      ('ID10007', 'George Clooney', 'george@example.com'),
      ('ID10008', 'Hannah Montana', 'hannah@example.com'),
      ('ID10009', 'Ian Somerhalder', 'ian@example.com'),
      ('ID10010', 'Jane Doe', 'jane@example.com');
    `);
    console.log("✅ Borrowers seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding borrowers failed:", err);
    process.exit(1);
  }
};

seedBorrowers();
