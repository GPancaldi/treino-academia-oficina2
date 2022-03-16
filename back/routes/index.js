const express = require('express');
const testeRoutes = require('./teste');

const apiRouter = express.Router();

apiRouter.use('/teste', testeRoutes);

module.exports = apiRouter;