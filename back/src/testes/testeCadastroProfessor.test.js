const request = require("supertest");
const app = require("../app");


 describe('Teste para checar se o cadastro esta funcionando', function(){
    it('Teste na rota POST /user', async function(){
      const response = await request(app)
        .post('/user')
        .send({
            "name" : "Johannes",
            "email" : "kadada@hotmail.com",
            "password" : "4215",
            "user_role_id" : 2
        })
        expect(200);      
      
    })
  });


