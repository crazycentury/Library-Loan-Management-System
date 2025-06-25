import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography
} from '@mui/material';

const BookList = ({ refreshKey }) => {
  const [books, setBooks] = useState([]);

  // get books
  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, [refreshKey]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        📕 Available Books
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookList;
