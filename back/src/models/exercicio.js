const Model = require("./model");

class Exercicio extends Model {
    properties = {
        isdeleted: false,
        name: "",
        treino_group_id: null,
        repeticoes: "",
        series: "",
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
        this.properties.treino_group_id = objToSet.treino_group_id ? objToSet.treino_group_id : this.properties.treino_group_id;
        this.properties.repeticoes = objToSet.repeticoes ? objToSet.repeticoes : this.properties.repeticoes;
        this.properties.series = objToSet.series ? objToSet.series : this.properties.series;
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


module.exports = Exercicio