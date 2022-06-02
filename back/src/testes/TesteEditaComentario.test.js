const request = require("supertest");
const app = require("../app");


describe('Testes para checar se a edição de um comentario comentario está funcionando', async function(){
    it('Teste na rota PUT /treino/comentario/1', async function(){
        const response = await request(app)
          .put('/treino/comentario/1')
          .send(
              {
                "treino_id": 1,
                "user_id" : 1,
                "comentario" : "TestfdeEdit"
              }
          )
          expect(200);      
          
      })

      it('Teste na rota PUT /treino/comentario/1 - badpath', async function(){
        const response = await request(app)
          .put('/treino/comentario/1')
          .send(
              {
                "treino_id": 1,
                "us_id" : 1,
                "comenario" : "TestfdeEdit"
              }
          )
          expect(400);      
          
      })



});