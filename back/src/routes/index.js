const express = require('express');
const userRoute = require('./user/user');

const apiRouter = express.Router();

apiRouter.use('/user', userRoute);

module.exports = apiRouter;