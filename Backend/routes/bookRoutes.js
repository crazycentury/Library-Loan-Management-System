const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validate = require('../middlewares/validateRequest');

router.get('/', bookController.getAllBooks);
router.post(
    '/', 
    validate(['title','isbn','stock']),
    bookController.createBook);

module.exports = router;
