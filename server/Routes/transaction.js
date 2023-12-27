const express = require('express');

const isAuth = require('../Middleware/isAuth')

const router = express.Router();

const transactionController = require('../Controller/transaction')

router.post('/add-transaction',isAuth,transactionController.addTransaction)

router.get('/transactions',isAuth,transactionController.getTransactions)

router.get('/financial-status',isAuth,transactionController.getFinancialStatus)

router.delete('/deleteTransaction/:id',isAuth,transactionController.deleteTransaction)

module.exports = router;

