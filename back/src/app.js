const express = require('express')
const app = express()
const apiRouter = require('../src/routes/index');
const BDService = require('../src/services/BDService');
var cors = require('cors')
app.use(express.json());
app.use('/', apiRouter);
app.use(cors())
innitBD();
module.exports = app;



function innitBD() {
    let bdService = new BDService();
    app.set('bdService', bdService);
}