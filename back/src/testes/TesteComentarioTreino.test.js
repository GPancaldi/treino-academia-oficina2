const request = require("supertest");
const app = require("../app");


describe('Testes para checar se o comentario está funcionando',  function(){
    it('Teste na rota POST treino/comentario', async function(){
        const response = await request(app)
          .post('treino/comentario')
          .send({
            "treino_id": 1,
            "user_id" : 1,
            "comentario" : "Teste"
          })
          expect(200);      
        
      })

      it('Teste na rota POST treino/comentario - badpath', async function(){
        const response = await request(app)
          .post('treino/comentario')
          .send({
            "treino_d": 1,
            "user_id" : 1,
            "comenario" : "Teste"
          })
          expect(400);      
        
      })

      it('Teste na rota POST treino/comentario - outro comentario', async function(){
        const response = await request(app)
          .post('treino/comentario')
          .send({
            "treino_id": 1,
            "user_id" : 1,
            "comentario" : "Teste2"
          })
          expect(200);      
        
      })


});