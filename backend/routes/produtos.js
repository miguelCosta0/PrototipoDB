var express = require('express');
var router = express.Router();
var dbPool = require('../services/pgconnect').ConnectToDbAndReturnPoll()

router.get('/', async function(req, res, next) {
  let allProds =  await dbPool.query("SELECT * FROM ecommerce.produto")
  res.send(allProds.rows)
});

router.get('/:id', async function(req, res, next) {
  let prod = await dbPool.query("SELECT * FROM ecommerce.produto WHERE id = $1", [req.params.id])
  res.send(prod.rows)
});

router.post('/', async function name(req, res, next) {
  let Nome = req.body.Nome
  let Price = req.body.Preco_Unitario
  
  if(Nome == undefined || Price == undefined)
  {
    res.status(400).send({error: "É Necessario um nome e um preço valido no corpo do request, veja a documentação"})
  }

  let Inserted = await dbPool.query("INSERT INTO produto(nome, preco_unitario) VALUES($1, $2) RETURNING *", [Nome, Price])
  res.status(201).send(Inserted.rows)
})

module.exports = router;
