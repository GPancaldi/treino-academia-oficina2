const express = require('express');
const router = express.Router();
const User = require('../../models/user')

router.get('/', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let user = await bdService.getRawInstructions("SELECT a.*, a.id, b.nome as role FROM users as A LEFT JOIN userrole as B ON a.user_role_id = b.id WHERE a.isdeleted <> true");
    res.send(user);
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let user = await bdService.getRawInstructions("SELECT a.*, a.id, b.nome as role FROM users as A LEFT JOIN userrole as B ON a.user_role_id = b.id WHERE a.id = $1 AND a.isdeleted <> true", [req.params.id]);
    res.send(user);
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.post('/', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    if((await bdService.getRawInstructions("SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND isdeleted <> true", [req.body.email])).length > 0) {
      throw new Error("E-mail já cadastrado");
    }
    let user = new User();
    user.setProperties(req.body);
    await bdService.postData("users", user.getProperties());
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    console.log("entered")
    let bdService = req.app.get('bdService');
    let result = await bdService.getRawInstructions("SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND isdeleted <> true AND password = $2", [req.body.email, req.body.password]);
    if(result.length < 1) {
      return res.status(401).send({
        message : "Erro de autenticação"
      })
    }
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let emailsCadastrados = (await bdService.getRawInstructions("SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND isdeleted <> true", [req.body.email]));
    if(emailsCadastrados.length >= 1 && emailsCadastrados[0].id != req.params.id) {
      throw new Error("E-mail já cadastrado");
    }
    let user = new User();
    user.setProperties({...req.body,
                        id : req.params.id});
    await bdService.putData("users", user.getProperties());
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    await bdService.softDeleteData("users", req.params.id);
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

module.exports = router;