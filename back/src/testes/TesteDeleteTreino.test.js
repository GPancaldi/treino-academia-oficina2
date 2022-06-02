const request = require("supertest");
const app = require("../app");

describe('Teste para checar se o Delete de um Treino está funcionando',  function(){
    it('Teste na rota DELETE /treino', async function(){
      const response = await request(app)
        .delete('/treino/1')
        .send(
            {
                "treino_id" : 1
            }
        )
        expect(200)
        
    })

    it('Teste na rota DELETE /treino - Deletar um treino ja deletado', async function(){
      const response = await request(app)
        .delete('/treino/1')
        .send(
            {
                "treino_id" : 1
            }
        )
        expect(401)
        
    })

    it('Teste na rota DELETE /treino - badpaht', async function(){
        const response = await request(app)
          .delete('/treino/2')
          .send(
              {
                  "treinoid" : 2
              }
          )
          expect(400)
          
      })
  

  });
