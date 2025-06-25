import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Autocomplete
} from '@mui/material';

const BorrowForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    borrower_id: '',
    book_id: '',
    borrow_date: '',
    return_deadline: ''
  });
  const [borrowers, setBorowers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    getBorrowers();
    getAllBooks();
  }, []);

  // get data borrowers untuk di field
  const getBorrowers = () => {
    axios.get('http://localhost:3000/borrowers')
      .then(res => setBorowers(res.data))
      .catch(err => console.error(err));
  };

  // get data books untuk di field
  const getAllBooks = () => {
    axios.get('http://localhost:3000/books')
      .then(res => setAllBooks(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // submit loan/borrow
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/loans/borrow', form);
      alert(res.data.message);
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || 'Borrowing failed');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📗 Borrow Book
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: 400 }}>
        <Stack spacing={2}>
           <Autocomplete
            options={borrowers}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => {
              setForm(prev => ({
                ...prev,
                borrower_id: value ? value.id : ''
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Borrower Name" required />
            )}
          />
          <Autocomplete
            options={allBooks}
            getOptionLabel={(option) => option.title}
            onChange={(e, value) => {
              setForm(prev => ({
                ...prev,
                book_id: value ? value.id : ''
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Book Title" required />
            )}
          />
          <TextField
            label="Borrow Date"
            name="borrow_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.borrow_date}
            onChange={handleChange}
            required
          />
          <TextField
            label="Return Deadline"
            name="return_deadline"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.return_deadline}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Borrow
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BorrowForm;
