const request = require("supertest");
const app = require("../app");

describe('Testes para checar se o cadastro de um exercicio esta funcionando', function(){
    it('Teste na rota POST /exercicio', async function(){
      const response = await request(app)
        .post('/exercicio')
        .send({
            "name": "Biceps Alternado",
            "treino_group_id": 1,
            "repeticoes": "9",
            "series": "3"
        })
        expect(200);      
      
    })

    it('Teste na rota POST /exercicio - treino ja cadastrado', async function(){
        const response = await request(app)
          .post('/exercicio')
          .send({
            "name": "Biceps Alternado",
            "treino_group_id": 1,
            "repeticoes": "9",
            "series": "3"
          })
          expect(401);      
      })

      it('Teste na rota POST /exercicio - Cadastrar outro exercicio', async function(){
        const response = await request(app)
          .post('/exercicio')
          .send({
            "name": "Supino reto",
            "treino_group_id": 1,
            "repeticoes": "12",
            "series": "4"
          })
          expect(200);      
        
      })

      it('Teste na rota POST /exercicio - badpath', async function(){
        const response = await request(app)
        .post('/exercicio')
        .send({
            "nae": "Rosca Scott",
            "treino_group_id": 1,
            "reeticoes": "15",
            "series": "3"
        })
        expect(400);

      })

});