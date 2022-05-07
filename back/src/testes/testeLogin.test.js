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
        expect(200);      
        
    })

    it('Teste na roda POST /user/login - Login errado', async function(){
      const response = await request(app)
        .post('/user/login')
        .send({
            "email" : "jonahgr@hotmail.com",
            "password" : "123"
        })
        expect(401);      
        
    })

    it('Teste na roda POST /user/login - badpath', async function(){
      const response = await request(app)
        .post('/user/login')
        .send({
            "email" : "jonahgr@hotmail.com"     
        })
        expect(400);      
        
    })

  
  });