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

router.post('/', async (req, res) => {
	let dataInicio = req.body.data_inicio
	let dataFim = req.body.data_fim
	let porcentagem = req.body.porcentagem

	if(dataInicio == undefined || dataFim == undefined || porcentagem == undefined)
	{
		res.status(400).send({error: "Todos os campos sao obrigatorios, leia a documentacao"})
	}

	if(isNaN(porcentagem) || porcentagem > 1 || porcentagem <= 0)
	{
		res.status(400).send({error: "A porcentagem de desconto deve ser um valor numerico entre 0 e 1, leia a documentacao"})
	}

	try {
		let descontoInserted = await dbPool.query("INSERT INTO desconto(data_inicio, data_fim, porcentagem) VALUES ($1,$2,$3) RETURNING *", [dataInicio, dataFim, porcentagem]);
		res.status(201).send(descontoInserted.rows)
	} catch (error) {
		res.status(500).send({error: "Um erro ocorreu durante essa consulta"})
	}
})

module.exports = router;