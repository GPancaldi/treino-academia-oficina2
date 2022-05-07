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

    it('Teste na rota POST /user Badpath - email ja cadastrado', async function(){
      const response = await request(app)
        .post('/user')
        .send({
            "name" : "Jamal",
            "email" : "kadada@hotmail.com",
            "password" : "8383",
            "user_role_id" : 2
        })
        expect(400);      
      
    })

    it('Teste na rota POST /user Cadastro de outro aluno', async function(){
      const response = await request(app)
        .post('/user')
        .send({
            "name" : "Jamal",
            "email" : "jamal@email.com",
            "password" : "8383",
            "user_role_id" : 2
        })
        expect(200);      
      
    })
  });


