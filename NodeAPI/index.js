var modelos = require("./modelos");
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var logger = require('morgan');
var puerto = process.env.PORT || 8082;
var rutas = require('./rutas.js').rutas;

app.use(bodyparser.json());
app.use(logger('dev'));
app.use('/api/v1',rutas);
app.listen(puerto);
console.log('Escuchando en '+puerto);