const request = require("supertest");
const app = require("../app");

describe('Teste para checar se o Delete de um exercicio está funcionando',  function(){
    it('Teste na rota DELETE /exercicio', async function(){
      const response = await request(app)
        .delete('/exercicio/1')
        .send(
            {
            }
        )
        expect(200)
        
    })

    it('Teste na rota DELETE /exercicio - Deletar um exercicio ja deletado', async function(){
      const response = await request(app)
        .delete('/exercicio/1')
        .send(
            {
                
            }
        )
        expect(401)
        
    })

    it('Teste na rota DELETE /exercicio - badpaht', async function(){
        const response = await request(app)
          .delete('/exercicio/2')
          .send(
              {
                  "exer"
              }
          )
          expect(400)
          
      })
  

  });
