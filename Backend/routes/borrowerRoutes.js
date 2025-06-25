const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerContorller');
const validate = require('../middlewares/validateRequest');

router.get('/', borrowerController.getAllBorrowers);
router.post(
    '/', 
    validate(['id_card_number','name','email']),
    borrowerController.createBorrower);

module.exports = router;
