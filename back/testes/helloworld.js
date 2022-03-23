const express = require('express');
const testeRoutes = express.Router();

testeRoutes.get('/', (req, res) => {
    res.send('Hello World!')
  })

module.exports = testeRoutes;