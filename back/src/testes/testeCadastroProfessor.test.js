const request = require("supertest");
const app = require("../app");


 describe('Testes no cadastro de um Professor', function(){
    it('Teste na rota POST /user happy way', async function(){
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

    it('Teste na rota POST /user badpath - email ja cadastrado', async function(){
      const response = await request(app)
        .post('/user')
        .send({
            "name" : "Professor teste",
            "email" : "professor@hotmail.com",
            "password" : "1234",
            "user_role_id" : 1
        })
        expect(400);      
      
    })

    it('Teste na rota POST /user happyway - Outro usuario', async function(){
      const response = await request(app)
        .post('/user')
        .send({
            "name" : "Professor Girafales",
            "email" : "professorsalsicha@hotmail.com",
            "password" : "9876",
            "user_role_id" : 1
        })
        expect(200);      
      
    })
  });


