var modelos = require('../modelos');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');  // Asegúrate de tener instalado el paquete 'jsonwebtoken'
var config = require('./config/config.json');

exports.autentificarUsuario = function(req, res) {
  var credenciales = auth(req);

  if (!credenciales) {
      res.status(400).json({
          message: 'Petición no válida'
      });
  } else {
      console.log(credenciales);
      login(credenciales.name, credenciales.pass)
          .then(function(result) {
              var token = jwt.sign(result, config.secret, {
                  expiresIn: 1440
              });
              res.status(result.status).json({
                  message: result.mensaje,
                  token: token
              });
          })
          .catch(function(error) {
              res.status(error.status).json({
                  message: error.mensaje
              });
          });
  }
}

function login(email, password) {
  return new Promise(function(resolve, reject) {
      modelos.Usuarios.findOne({
              where: {
                  email: email
              }
          })
          .then(function(usuario) {
              if (!usuario) {
                  reject({ status: 404, mensaje: 'No existe el usuario' });
              } else {
                  console.log('Usuario encontrado. Procesando...');
                  var hashed_password = usuario.password;
                  if (bcrypt.compareSync(password, hashed_password)) {
                      console.log('Login correcto');
                      resolve({ status: 200, mensaje: email });
                  } else {
                      console.log('Login incorrecto');
                      reject({ status: 401, mensaje: 'Credenciales inválidas' });
                  }
              }
          })
          .catch(function(err) {
              console.log(err);
              reject({ status: 500, mensaje: 'Error interno' });
          });
  });
}