const request = require("supertest");
const app = require("../app");


describe('Testes para checar se a edição de um exercicio está funcionando',  function(){
    it('Teste na rota PUT /exercicio', async function(){
        const response = await request(app)
          .put('/exercicio/1')
          .send(
              {
                "name" : "Supino Inclinado"
              }
          )
          expect(200);      
          
      })

      it('Teste na rota PUT /exercicio - badpath', async function(){
        const response = await request(app)
          .put('/exercicio/2')
          .send(
              {
                "na" : "Rosca Direta"
              }
          )
          expect(400);      
          
      })


      it('Teste na rota PUT /exercicio - outra edicao', async function(){
        const response = await request(app)
          .put('/exercicio/2')
          .send(
              {
                "name" : "Rosca Direta"
              }
          )
          expect(200);      
          
      })

});