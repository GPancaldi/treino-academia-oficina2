const express = require('express');
const ComentarioTreino = require('../../models/comentarioTreino');
const router = express.Router();
const Treino = require('../../models/treino')

router.get('/', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let treinos = await bdService.getRawInstructions(`SELECT * FROM treino WHERE isdeleted <> true`);
    for (const treino of treinos) {
      treino.exercicios = await bdService.getRawInstructions(`SELECT * FROM exercicio WHERE isdeleted <> true AND treino_group_id = $1`, [treino.id]) 
      treino.comentarios = await bdService.getRawInstructions(`SELECT a.*, b.name as author_name FROM comentario_treino as a LEFT JOIN users as B ON a.user_id = b.id 
      WHERE a.isdeleted <> true AND a.treino_id = $1`, [treino.id]) 
    }
    res.send(treinos);
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let treino = await bdService.getRawInstructions("SELECT * FROM treino WHERE id = $1 AND isdeleted <> true", [req.params.id]);
    treino[0].exercicios = await bdService.getRawInstructions(`SELECT * FROM exercicio WHERE isdeleted <> true AND treino_group_id = $1`, [treino[0].id]) 
    treino[0].comentarios = await bdService.getRawInstructions(`SELECT a.*, b.name as author_name FROM comentario_treino as a LEFT JOIN users as B ON a.user_id = b.id 
    WHERE b.isdeleted <> true AND a.treino_id = $1`, [treino[0].id]) 
    res.send(treino);
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.post('/', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let treino = new Treino();
    treino.setProperties(req.body);
    await bdService.postData("treino", treino.getProperties());
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
    let treinoOnBack = await bdService.getRawInstructions("SELECT a.* FROM treino as a WHERE a.id = $1 AND a.isdeleted <> true", [req.params.id]);
    let treino = new Treino();
    treino.setProperties({...Object.assign(treinoOnBack[0], req.body),
                        id : req.params.id});
    await bdService.putData("treino", treino.getProperties());
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
    await bdService.softDeleteData("treino", req.params.id);
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.post('/comentario', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let comentario = new ComentarioTreino();
    comentario.setProperties(req.body);
    await bdService.postData("comentario_treino", comentario.getProperties());
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

router.put('/comentario/:id', async (req, res) => {
  try {
    let bdService = req.app.get('bdService');
    let comentario = new ComentarioTreino();
    let comentarioOnBack = await bdService.getRawInstructions("SELECT * FROM comentario_treino as a WHERE id = $1", [req.params.id]);
    comentario.setProperties({...Object.assign(comentarioOnBack[0], req.body),
                        id : req.params.id});
    await bdService.putData("comentario_treino", comentario.getProperties());
    res.send({success : true});
  } catch (err) {
    return res.status(400).send({
      message : err.toString()
    })
  }
})

module.exports = router;