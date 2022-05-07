const request = require("supertest");
const app = require("../app");


describe('Teste para checar se o Delete está funcionando', function(){
    it('Teste na rota PUT /user/7', async function(){
      const response = await request(app)
        .delete('/user/7')
        .send(
            {
                "user_role_id" : 2
            }
        )
        expect(200)
        
    })

    it('Teste na rota PUT /user/7 - Deletar um usuario ja deletado', async function(){
      const response = await request(app)
        .delete('/user/7')
        .send(
            {
                "user_role_id" : 2
            }
        )
        expect(401)
        
    })
  });

  