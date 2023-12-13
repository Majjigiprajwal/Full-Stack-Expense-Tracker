const express = require('express');

const isAuth = require('../Middleware/isAuth')

const router = express.Router();

const transactionController = require('../Controller/transaction')

router.post('/add-transaction',isAuth,transactionController.addTransaction)

router.get('/transactions',isAuth,transactionController.getTransactions)

module.exports = router;

