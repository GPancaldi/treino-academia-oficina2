const request = require("supertest");
const app = require("../app");

describe('Testes para checar se o cadastro de um treino esta funcionando', function(){
    it('Teste na rota POST /treino', async function(){
      const response = await request(app)
        .post('/treino')
        .send({
            "name" : "Treino Peito"
        })
        expect(200);      
      
    })

    it('Teste na rota POST /treino Badpath - treino ja cadastrado', async function(){
        const response = await request(app)
          .post('/treino')
          .send({
              "name" : "Treino Peito"
          })
          expect(401);      
      })

      it('Teste na rota POST /treino - Cadastrar outro treino', async function(){
        const response = await request(app)
          .post('/treino')
          .send({
              "name" : "Treino Costas"
          })
          expect(200);      
        
      })

      it('Teste na rota Post /treino - colocar um campo invalido', async function(){
        const response = await request(app)
        .post('/treino')
        .send({
            "naime" : "adsasdads"
        })
        expect(400);

      })

});