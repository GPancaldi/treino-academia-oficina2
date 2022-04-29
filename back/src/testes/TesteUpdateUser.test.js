const request = require("supertest");
const app = require("../app");


describe('Teste para checar se o Update está funcionando', function(){
    it('Teste na rota PUT /user/9', async function(){
      const response = await request(app)
        .post('/user/9')
        .send(
            {
                "name" : "Da",
                "email" : "jonahgr@hotmail.com",
                "password" : "4531",
                "user_role_id" : 2
            }
        )
        expect(response.statusCode).toBe(200);      
        
    })
  });