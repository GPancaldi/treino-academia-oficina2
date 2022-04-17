const Model = require("./model");

class User extends Model {
    properties = {
        isdeleted: false,
        name: "",
        email: "",
        password: "",
        id: null,
        user_role_id: null
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
        this.properties.email = objToSet.email ? objToSet.email : this.properties.email;
        this.properties.password = objToSet.password ? objToSet.password : this.properties.password;
        this.properties.user_role_id = objToSet.user_role_id ? objToSet.user_role_id : this.properties.user_role_id;
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


module.exports = User