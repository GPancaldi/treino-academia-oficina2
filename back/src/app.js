const express = require('express')
const app = express()
const apiRouter = require('../routes/index');
const BDService = require('../services/BDService');
app.use('/', apiRouter);
app.bdService = new BDService();
module.exports = app;

