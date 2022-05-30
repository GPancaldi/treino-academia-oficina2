const express = require('express');
const router = express.Router();
const Exercicio = require('../../models/exercicio')

router.get('/', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let exercicio = await bdService.getRawInstructions("SELECT a.*, a.id, b.name as treino_group FROM exercicio as A LEFT JOIN treino as B ON a.treino_group_id = b.id WHERE a.isdeleted <> true");
    res.send(exercicio);
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let exercicio = await bdService.getRawInstructions("SELECT a.*, a.id, b.name as treino_group FROM exercicio as A LEFT JOIN treino as B ON a.treino_group_id = b.id WHERE a.id = $1 AND a.isdeleted <> true", [req.params.id]);
    res.send(exercicio);
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.post('/', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let exercicio = new Exercicio();
    exercicio.setProperties(req.body);
    await bdService.postData("exercicio", exercicio.getProperties());
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
    let exercicioOnBack = await bdService.getRawInstructions("SELECT a.*, a.id, b.name as treino_group FROM exercicio as A LEFT JOIN treino as B ON a.treino_group_id = b.id WHERE a.id = $1 AND a.isdeleted <> true", [req.params.id]);
    let exercicio = new Exercicio();
    exercicio.setProperties({...Object.assign(exercicioOnBack[0], req.body),
                        id : req.params.id});
    await bdService.putData("exercicio", exercicio.getProperties());
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
    await bdService.softDeleteData("exercicio", req.params.id);
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

module.exports = router;