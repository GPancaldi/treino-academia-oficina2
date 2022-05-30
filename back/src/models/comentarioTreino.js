const Model = require("./model");

class ComentarioTreino extends Model {
    properties = {
        comentario: "",
        treino_id : null,
        user_id : null,
        id: null,
        isdeleted: false,
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
        this.properties.comentario = objToSet.comentario ? objToSet.comentario : this.properties.comentario;
        this.properties.treino_id = objToSet.treino_id ? objToSet.treino_id : this.properties.treino_id;
        this.properties.user_id = objToSet.user_id ? objToSet.user_id : this.properties.user_id;
        this.properties.isdeleted = objToSet.isdeleted ? objToSet.isdeleted : this.properties.isdeleted;
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


module.exports = ComentarioTreino