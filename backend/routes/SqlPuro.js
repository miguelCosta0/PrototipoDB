var express = require('express');
var router = express.Router();
var dbPool = require('../services/pgconnect').ConnectToDbAndReturnPoll()

router.post('/', async (req, res) => {
    let rawSQL = req.body.sql;
    if(rawSQL == undefined)
    {
        return res.status(400).send({error:"O corpo da requisicao deve conter um SQL para se executar"});
    }

    try
    {
        console.log(rawSQL)
        let result = await dbPool.query(`${rawSQL}`)
        res.status(200).send(result.rows)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send({error:"A consulta deu erro, verifique se ela esta bem estruturada"})
    }
})

module.exports = router