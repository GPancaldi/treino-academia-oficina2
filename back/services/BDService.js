const { Client } = require('pg')
const { config } = require("../config/config")
class BDService {
    client;
    constructor() {
        this.client = new Client(config.connectionString)
        this.initConnection();
    }

    async initConnection() {
        console.log("Iniciando conexão com banco");
        await this.client.connect();
        console.log("Teste query")
        await this.testeQuery();
    }

    async testeQuery() {
        return new Promise((resolve) => {
            this.client.query("SELECT * from tableteste").then((res) => {
                console.log(res.rows)
                resolve(res);
            })
        })
    }
}

module.exports = BDService;