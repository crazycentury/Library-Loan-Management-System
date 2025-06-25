const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const validate = require('../middlewares/validateRequest');

router.get('/', loanController.getAllLoans);
router.post(
  '/borrow',
  validate(['borrower_id', 'book_id', 'borrow_date', 'return_deadline']),
  loanController.borrowBook
);

router.post(
  '/return',
  validate(['borrower_id', 'book_id', 'return_date']),
  loanController.returnBook
);
module.exports = router;
