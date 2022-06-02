const Model = require("./model");

class Treino extends Model {
    properties = {
        isdeleted: false,
        name: "",
        id: null,
    }
    constructor() {
        super()
    }

    /**
     * Popula a classe de acordo com o objeto enviado
     * @param {*} objToSet referente aos objeto a ser setado
     * @returns {Object} 
     */
    setProperties(objToSet) {
        this.properties.id = objToSet.id ? objToSet.id : this.properties.id;
        this.properties.isdeleted = objToSet.isdeleted ? objToSet.isdeleted : this.properties.isdeleted;
        this.properties.name = objToSet.name ? objToSet.name : this.properties.name;
        return this.properties;
    }


    /**
    * Puxa todas as propriedades da classe
    * @returns {Object} 
    */
    getProperties() {
        return this.properties;
    }
}


module.exports = Treino