const request = require("supertest");
const app = require("../app");


 /*describe('Teste para checar se o cadastro esta funcionando', function(){
    it('Teste na rota POST /user', async function(){
      const response = await request(app)
        .post('/user')
        .send({
            "name" : "Johannes",
            "email" : "kadada@hotmail.com",
            "password" : "4215",
            "user_role_id" : 2
        })
        expect(response.statusCode).toEqual(200);      
      
    })
  });

*/

  describe('Teste para checar se o cadastro esta funcionando', function(){
    it('Teste na rota POST /user', function(done){
      request(app)
      .post('/user')
      .send({
        "name" : "Johannes",
        "email" : "kadada@hotmail.com",
        "password" : "4215",
        "user_role_id" : 2
    })
        .then(response => {
          setTimeout(() => {
            expect(response.statusCode).toBe(200);
            .end(function(err, res){
                if(err){
                  return done(err);
                }
                done();
            });
          }, 10000);
        });
    })
  });

