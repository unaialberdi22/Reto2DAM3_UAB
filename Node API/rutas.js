var auth = require('basic-auth');
var jwt = require('jsonwebtoken');
var express = require('express');
var rutas = express.Router();
var registro = require('./controladores/registro');
var login = require('./controladores/login');
var config = require('./config/config.json');

rutas.get('/', function(req, res) {
    res.end('Bienvenido a la raiz de la api');
});
rutas.post('/autentificar', function(req, res) {
    var credenciales = auth(req);

    if (!credenciales) {

        res.status(400).json({
            message: 'Petición no valida'
        });

    } else {
        console.log(credenciales);
        login.Login(credenciales.name, credenciales.pass)
            .then(function(result) {
                var token = jwt.sign(result, config.secret, {
                    expiresIn: 1440
                });
                res.status(result.status).json({
                    message: result.mensaje,
                    token: token
                });

            }, function(error) {

                res.status(error.status).json({
                    message: error.mensaje
                });
            });
    }
})

exports.rutas = rutas;