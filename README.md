📚 Library Loan Management System

This is a simple full-stack application to help library administrators manage book lending.Built using Node.js, Express, PostgreSQL, and React.js (with Material UI).

🔧 Features

Backend (REST API):

📘 Book Management – Add & list available books

👤 Borrower Management – Add & list library members

🔁 Book Loans – Borrow and return books

✅ Stock Control – Borrow only when stock is available

⏱️ Loan Deadline – Max 30 days loan duration

🚫 One active loan at a time per borrower

📊 Loan tracking – Monitor late returns

Frontend:

📄 Display books & loans in tables

✅ Forms to borrow/return books

🔍 Autocomplete search for borrowers by name


⚙️ Tech Stack

Backend : Node.js, Express.js, PostgreSQL

Frontend : React.js, Material UI

Database : PostgreSQL


🛠️ Setup Guide

1. Clone Project

git clone https://github.com/crazycentury/Library-Loan-Management-System.git
cd Library-Loan-Management-System

2. Setup Backend

cd backend
npm install

Create .env file:

    PORT=3000
    DATABASE_URL=postgres://username:password@localhost:5432/{db_name}

Run database migration:

    psql -U your_user -d library_db -f schema.sql

Seed data:

    node db/seedLoanStatuses.js
    node db/seedBooks.js
    node db/seedBorrowers.js

Start server:

    npm run dev

3. Setup Frontend

cd ../library-frontend
npm install
npm start

Make sure backend runs on port 3000 and frontend on 3001 to avoid conflict

📁 Project Structure

/backend
  ├── db/
  ├── controllers/
  ├── middlewares/
  ├── routes/
  └── app.js

/library-ui
  ├── src/
  ├── App.js
  └── view/

🧱 Database Schema (DDL)

The full schema is in schema_db.sql.Use this file to create the required tables in PostgreSQL.

📌 Assumptions

One loan per borrower at a time.

Return deadline is set by user but limited to 30 days.

Loan is considered late if returned after deadline.

No authentication is implemented.

📄 License

This project is open-source and available for educational or development purposes.

🙋 Author

Developed by Iqbal Muflihuddin Email: iqbalmuflihuddin27@gmail.com




