import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography
} from '@mui/material';

const LoanList = ({ refreshKey }) => {
  const [loans, setLoans] = useState([]);

  // get data loans
  useEffect(() => {
    axios.get('http://localhost:3000/loans')
      .then(res => setLoans(res.data))
      .catch(err => console.error(err));
  }, [refreshKey]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        📄 Loan History
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell>ID</TableCell>
              <TableCell>Borrower</TableCell>
              <TableCell>Book</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loans.map(loan => (
              <TableRow key={loan.id}>
                <TableCell>{loan.id}</TableCell>
                <TableCell>{loan.borrower_name}</TableCell>
                <TableCell>{loan.title}</TableCell>
                <TableCell>{loan.borrow_date}</TableCell>
                <TableCell>{loan.return_deadline}</TableCell>
                <TableCell>{loan.return_date || '-'}</TableCell>
                <TableCell
                  sx={{
                    color:
                      loan.status_name === 'late'
                        ? 'red'
                        : loan.status_name === 'returned'
                        ? 'green'
                        : 'blue'
                  }}
                >
                  {loan.status_name}
                </TableCell>
              </TableRow>
            ))}

            {loans.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No loan history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LoanList;
