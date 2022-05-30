const express = require('express');
const userRoute = require('./user/user');
const exercicioRoute = require('./exercicio/exercicio');

const apiRouter = express.Router();

apiRouter.use('/user', userRoute);
apiRouter.use('/exercicio', exercicioRoute);

module.exports = apiRouter;