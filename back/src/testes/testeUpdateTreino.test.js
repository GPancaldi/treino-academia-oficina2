const request = require("supertest");
const app = require("../app");


describe('Testes para checar se a edição de um treino está funcionando', async function(){
    it('Teste na rota PUT /treino', async function(){
        const response = await request(app)
          .put('/treino/1')
          .send(
              {
                "name" : "Treino Peito2"
              }
          )
          expect(200);      
          
      })

      it('Teste na rota PUT /treino - badpath', async function(){
        const response = await request(app)
          .put('/treino/1')
          .send(
              {
                "na" : "Treino Peito3"
              }
          )
          expect(400);      
          
      })


      it('Teste na rota PUT /treino', async function(){
        const response = await request(app)
          .put('/treino/2')
          .send(
              {
                "name" : "Treino costa2"
              }
          )
          expect(200);      
          
      })

});