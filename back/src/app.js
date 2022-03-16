const express = require('express')
const app = express()
const apiRouter = require('../routes/index');
app.use('/', apiRouter);

module.exports = app;

