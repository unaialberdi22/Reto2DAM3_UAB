var auth = require('basic-auth');
var jwt = require('jsonwebtoken');
var express = require('express');
var rutas = express.Router();
var usuarios = require('./controladores/usuarios.js');
var config = require('./config/config.json');

rutas.get('/', function(req, res) {
    res.end('Bienvenido a la raiz de la api');
});
rutas.post('/registro', usuarios.RegistrarUsuario);
rutas.post('/login', usuarios.autentificarUsuario);
rutas.get('/showUsers', usuarios.mostrarUsuarios);
rutas.put('/updateUser', usuarios.actualizarUsuario);
rutas.delete('/deleteUser', usuarios.borrarUsuario);
exports.rutas = rutas;