const express = require('express');
const cookieParser = require('cookie-parser');

/**
 * Routes Required
 */
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.route');


const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * Routes Used
 */
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);


module.exports = app;