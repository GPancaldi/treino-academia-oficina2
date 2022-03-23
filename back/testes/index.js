const express = require('express');
const helloWorldRoute = require('./helloworld');

const apiRouter = express.Router();

apiRouter.use('/helloworld', helloWorldRoute);

module.exports = apiRouter;