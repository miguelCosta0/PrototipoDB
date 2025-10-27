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

module.exports = router;
