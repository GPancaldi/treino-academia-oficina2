const request = require("supertest");
const app = require("../app");


 describe('Teste para checar se o cadastro esta funcionando', function(){
    it('Teste na rota POST /user', async function(){
      const response = await request(app)
        .post('/user')
        .send({
            "name" : "Professor",
            "email" : "professor@hotmail.com",
            "password" : "4215",
            "user_role_id" : 1
        })
        expect(200);      
      
    })
  });


