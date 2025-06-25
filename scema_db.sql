-- Tabel buku
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel peminjam
CREATE TABLE borrowers (
    id SERIAL PRIMARY KEY,
    id_card_number VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Status peminjaman (lookup)
CREATE TABLE loan_statuses (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE NOT NULL -- e.g. 'borrowed', 'returned', 'late'
); 

-- Tabel peminjaman
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    borrower_id INTEGER REFERENCES borrowers(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    borrow_date DATE NOT NULL,
    return_deadline DATE NOT NULL,
    return_date DATE,
    status_id INTEGER REFERENCES loan_statuses(id),
    
    CONSTRAINT one_book_per_loan UNIQUE (borrower_id, book_id, borrow_date),
    CHECK (return_deadline <= borrow_date + INTERVAL '30 days'),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
