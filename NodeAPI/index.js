var express = require('express');
var app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen (puedes ajustarlo según tus necesidades)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
var bodyparser = require('body-parser');
var logger = require('morgan');
var puerto = process.env.PORT || 3000;
var rutas = require('./rutas.js').rutas;

app.use(bodyparser.json());
app.use(logger('dev'));
app.use('/api/v1',rutas);
app.listen(puerto);
console.log('Escuchando en '+ puerto);