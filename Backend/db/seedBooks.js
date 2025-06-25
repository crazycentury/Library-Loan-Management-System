const pool = require('./index');

const seedBooks = async () => {
  try {
    await pool.query(`
      INSERT INTO books (title, isbn, stock) VALUES
      ('Clean Code', '9780132350884', 5),
      ('The Pragmatic Programmer', '9780201616224', 4),
      ('JavaScript: The Good Parts', '9780596517748', 6),
      ('Refactoring', '9780201485677', 3),
      ('You Don’t Know JS', '9781491904244', 5),
      ('Design Patterns', '9780201633610', 2),
      ('Eloquent JavaScript', '9781593279509', 5),
      ('Introduction to Algorithms', '9780262033848', 3),
      ('Structure and Interpretation of Computer Programs', '9780262510875', 2),
      ('The Mythical Man-Month', '9780201835953', 4),
      ('Cracking the Coding Interview', '9780984782857', 6),
      ('Algorithms', '9780321573513', 4),
      ('Domain-Driven Design', '9780321125217', 3),
      ('Software Engineering', '9780132351632', 5),
      ('Continuous Delivery', '9780321601919', 2),
      ('Code Complete', '9780735619678', 5),
      ('Effective Java', '9780134685991', 4),
      ('Clean Architecture', '9780134494166', 3),
      ('Soft Skills', '9781617292392', 2),
      ('Working Effectively with Legacy Code', '9780131177055', 3);
    `);
    console.log("✅ Books seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding books failed:", err);
    process.exit(1);
  }
};

seedBooks();
