var express = require('express');
var router = express.Router();
var dbPool = require('../services/pgconnect').ConnectToDbAndReturnPoll()

router.get('/', async function(req, res, next) {
	let query;
  let prodId = req.query.AssociadoComProdutoId

	if(prodId != undefined && isNaN(prodId))
	{
		return res.status(400).send({error: "O parametro passado nao é um numero, passe um id de um produto para associar"})
	}
	if(prodId)
	{
		query = await dbPool.query("SELECT P.id as ProdId, D.id as DescId, data_inicio, data_fim, porcentagem FROM produto P, produtodesconto PD, desconto D WHERE P.id = $1 And P.id = PD.produto_id AND D.id = pd.desconto_id;", [prodId])
	}
	else
	{
		query =  await dbPool.query("SELECT * FROM ecommerce.desconto")
	}
  res.send(query.rows)
});

router.get('/:id', async function(req, res, next) {
  let prod = await dbPool.query("SELECT * FROM desconto WHERE id = $1", [req.params.id])
  res.send(prod.rows)
});

module.exports = router;