const express = require('express');
const userRoute = require('./user/user');
const exercicioRoute = require('./exercicio/exercicio');
const treinoRoute = require('./treino/treino');

const apiRouter = express.Router();

apiRouter.use('/user', userRoute);
apiRouter.use('/exercicio', exercicioRoute);
apiRouter.use('/treino', treinoRoute);

module.exports = apiRouter;