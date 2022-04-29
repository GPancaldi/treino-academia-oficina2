const request = require("supertest");
const app = require("../app");


describe('Teste para checar se o login está funcionando', function(){
    it('Teste na roda POST /user/login', async function(){
      const response = await request(app)
        .post('/user/login')
        .send({
            "email" : "jonahgr@hotmail.com",
            "password" : "45311"
        })
        expect(response.statusCode).toBe(200);      
        
    })
  });