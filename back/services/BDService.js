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
        console.log("Conexão estabelecida com sucesso, teste...")
        await this.testeQuery();
    }

    async testeQuery() {
        this.client.query("SELECT * from tableteste").then((res) => {
            console.log(res.rows)
        })
    }
}

module.exports = BDService;