const Sequelize = require('sequelize');
const modelos = require('../modelos');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');  // Asegúrate de tener instalado el paquete 'jsonwebtoken'
var config = require('../config/config.json');
var auth = require('basic-auth');

//Seccion Todos los Usuarios

//Seccion Registro
exports.RegistrarUsuario = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
  
    const nuevoUsuario = modelos.Usuarios.build({
      username: req.body.nombre,
      password: hash,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
  
    nuevoUsuario.save()
      .then((nuevoUsuario) => {
        console.log('Usuario ' + nuevoUsuario.username + ' creado con éxito');
  
        // Resto del código...
  
        // Envía la respuesta al cliente
        res.status(200).json({ mensaje: "Usuario creado con éxito" });
      })
      .catch((error) => {
        if (error instanceof Sequelize.ValidationError) {
          console.log("Errores de validación:", error.errors);
          error.errors.forEach((e) => {
            console.log('Error en el campo:', e.value);
          });
          res.status(400).json({ mensaje: "Errores de validación", error });
        } else {
          console.log("Error:", error);
          res.status(500).json({ mensaje: "Error interno", error });
        }
      });
  };

  //seccion Login
  exports.autentificarUsuario = function(req, res) {
    var credenciales = req.body;  // Extraer credenciales del cuerpo de la solicitud
    console.log(credenciales);

    if (!credenciales || !credenciales.email || !credenciales.password) {
        res.status(400).json({
            message: 'Petición no válida. Asegúrate de proporcionar email y contraseña en el cuerpo de la solicitud.'
        });
    } else {
        login(credenciales.email, credenciales.password)
            .then(function(result) {
                var token = jwt.sign(result, config.secret, {
                    expiresIn: 1440
                });
                res.status(result.status).json({
                    message: "Inicio de sesión realizado en: " + result.mensaje,
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

exports.actualizarUsuario = function(req, res) {
    
}

exports.borrarUsuario = function(req, res) {
    
}

exports.mostrarUsuarios = function(req, res) {
    modelos.Usuarios.findAll()
        .then(usuarios => {
            res.status(200).json(usuarios);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno al obtener usuarios' });
        });
}