var auth = require('basic-auth');
var jwt = require('jsonwebtoken');
var express = require('express');
var rutas = express.Router();
var usuarios = require('./controladores/usuarios.js');
var config = require('./config/config.json');
var incidencias = require('./controladores/incidencias.js');

rutas.get('/', function(req, res) {
    res.end('Bienvenido a la raiz de la api');
});

rutas.post('/registro', usuarios.registrarUsuario);
rutas.post('/login', usuarios.autentificarUsuario);
rutas.get('/showUsers', usuarios.mostrarUsuarios);
rutas.put('/updateUser', usuarios.actualizarUsuario);
rutas.delete('/deleteUser', usuarios.borrarUsuario);
rutas.post('/getUser', usuarios.obtenerUsuario);

rutas.post('/addIncidence', incidencias.añadirIncidencia);
rutas.post('/getIncidence', incidencias.obtenerIncidencia);
rutas.get('/showIncidences', incidencias.mostrarIncidencias);
rutas.put('/updateIncidence', incidencias.actualizarIncidencia);
rutas.delete('/deleteIncidence', incidencias.borrarIncidencia);


// rutas.post('/login', usuarios.autentificarUsuario);
// rutas.get('/showUsers', usuarios.mostrarUsuarios);
// rutas.put('/updateUser', usuarios.actualizarUsuario);
// rutas.delete('/deleteUser', usuarios.borrarUsuario);

exports.rutas = rutas;