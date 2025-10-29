var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv').config()

var produtosRouter = require('./routes/produtos');
var tabelasRouter = require('./routes/tabelas');
var descontosRouter = require('./routes/descontos')
var SqlPurissimoRouter = require('./routes/SqlPuro')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/produtos', produtosRouter);
app.use('/tabelas', tabelasRouter);
app.use('/descontos', descontosRouter)
app.use('/rawsql', SqlPurissimoRouter)

app.listen(process.env.EXPRESS_PORT)

module.exports = app;
