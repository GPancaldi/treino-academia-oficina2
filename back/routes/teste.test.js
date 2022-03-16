const request = require("supertest");
const testeRoutes = require("./teste");
const express = require('express');
const app = require('../src/app');

describe('Teste para checar se a rota está funcionando', function(){
    it('Teste na roda GET /teste/', function(done){
      request(app)
        .get('/teste')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });