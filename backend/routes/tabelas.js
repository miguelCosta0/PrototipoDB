var express = require('express');
var router = express.Router();
var dbPool = require('../services/pgconnect').ConnectToDbAndReturnPoll()

router.get('/', async function(req, res, next) {
  let allProds =  await dbPool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'ecommerce'")
  res.send(allProds.rows)
});

router.get('/:tabela', async function(req, res, next) {
  console.log(req.params.tabela)
  let prod = await dbPool.query("SELECT column_name, is_nullable , data_type FROM information_schema.columns WHERE table_schema = 'ecommerce' AND table_name = $1", [req.params.tabela])
  res.send(prod.rows)
});

module.exports = router;
