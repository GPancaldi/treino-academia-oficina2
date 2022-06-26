const { Client } = require('pg')
const { config } = require("../../config/config")
class BDService {
    client;
    constructor(masked = false) {
        console.log(masked)
        this.client = new Client(masked ? config.developermasked : config.connectionString)
        this.initConnection();
    }

    async initConnection() {
        await this.client.connect();
    }

    async getRawInstructions(instructions, argumentsSql = []) {
        try {
            let result = await this.client.query(`${instructions}`, argumentsSql);
            return result.rows;
        } catch (err) {
            console.log(err)
            console.log("Ocorreu um erro ao realizar operação no banco. GETRAWINSTRUCTIONS");
            throw new Error(err.error);
        }
    }

    async getData(tablename, objToSet) {
        try {
            let result = await this.client.query(`SELECT * FROM ${tablename} WHERE isdeleted <> true`);
            return result.rows;
        } catch (err) {
            console.log("Ocorreu um erro ao realizar operação no banco. GETDATA");
            throw new Error(err.error);
        }
    }

    async postData(tablename, objToSet) {
        try {
            let result = await this.client.query(
                `INSERT INTO ${tablename} ${this.setQueryInsert(objToSet)}`);
            return result;
        } catch (err) {
            console.log("Ocorreu um erro ao realizar operação no banco. POSTDATA");
            throw new Error(err);
        }
    }

    async putData(tablename, objToSet) {
        try {
            let result = await this.client.query(`UPDATE ${tablename}
            SET ${this.setQueryUpdate(objToSet)}
            WHERE id = ${objToSet.id} AND isdeleted <> true`);
            return result;
        } catch (err) {
            console.log("Ocorreu um erro ao realizar operação no banco. PUTDATA");
            throw new Error(err.error);
        }
    }

    async softDeleteData(tablename, id) {
        try {
            let result = await this.client.query(`UPDATE ${tablename}
            SET isdeleted = true
            WHERE id = ${id}`);
            return result;
        } catch (err) {
            console.log("Ocorreu um erro ao realizar operação no banco. SOFTDELETEDATA");
            throw new Error(err.error);
        }
    }

    setQueryInsert(objToSet) {
        let propertiesName = Object.keys(objToSet);
        let propertyFiltered = {};
        for (const propertyName of propertiesName) {
            let valueProperty = objToSet[propertyName];
            if(valueProperty != undefined && valueProperty != null) {
                propertyFiltered[propertyName] = valueProperty;
            }
        }
        return `(${Object.getOwnPropertyNames(propertyFiltered).join(", ")})
        VALUES ('${Object.values(propertyFiltered).join("', '")}')`
    }

    setQueryUpdate(objToSet) {
        let propertiesName = Object.keys(objToSet);
        let queryUpdate = [];
        for (const propertyName of propertiesName) {
            let valueProperty = objToSet[propertyName];
            if(valueProperty != undefined && valueProperty != null && propertyName != 'id') {
                queryUpdate.push(`${propertyName} = '${valueProperty}'`); 
            }
        }
        return queryUpdate.join(", ");
    }
}

module.exports = BDService;