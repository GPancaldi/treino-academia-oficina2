const express = require('express')
const app = express()
const apiRouter = require('../src/routes/index');
const BDService = require('../src/services/BDService');
var cors = require('cors')
app.use(express.json());
app.use(cors())
app.use(checkForMasked);
app.use('/', apiRouter)
module.exports = app;



function innitBD(isMasked) {
    let bdService = new BDService(isMasked);
    app.set('bdService', bdService);
}

function checkForMasked(req, res, next) {
    const isMasked = req.headers['is-masked']
    console.log(isMasked)
    innitBD(isMasked == 1 ? true : false);
    next();
}