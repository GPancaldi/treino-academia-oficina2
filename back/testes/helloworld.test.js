const request = require("supertest");
const app = require('../src/app');

describe('Teste para checar se a rota está funcionando', function(){
    it('Teste na roda GET /helloworld/', function(done){
      request(app)
        .get('/helloworld')
        .then(response => {
          setTimeout(() => {
            expect(response.statusCode).toBe(200);
            done();
          }, 1000);
        });
    })
  });

  afterAll(() => {
    app.bdService.client.end();
  });
  
  