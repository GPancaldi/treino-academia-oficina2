const request = require("supertest");
const app = require("../app");


describe('Teste para checar se o Update está funcionando', function(){
    it('Teste na rota PUT /user/9', async function(){
      const response = await request(app)
        .put('/user/9')
        .send(
            {
                "treino_id": 1,
	            "user_id" : 1,
	            "comentario" : "TestfdeEdit"
            }
        )
        expect(200);      
        
    })

    it('Teste na rota PUT /user/9 -  Update com e-mail ja cadastrado', async function(){
      const response = await request(app)
        .put('/user/9')
        .send(
            {
                "name" : "Da",
                "email" : "jamal@email.com",
                "password" : "4531",
                "user_role_id" : 2
            }
        )
        expect(401);      
        
    })
  });

