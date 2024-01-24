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

exports.obtenerUsuario = async function(req, res) {
  try {
    // Obtener el userId del cuerpo de la solicitud
    const userId = req.body.userId;
    modelos.Usuarios.findAll({
      where: { id: userId }
  })
    const usuario = await modelos.Usuarios.findByPk(userId);

    if (usuario) {
      res.status(200).json({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
      });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ mensaje: 'Error interno al obtener usuario', error });
  }
};

exports.actualizarUsuario = async function(req, res) {
  try {
    // Obtener el userId del cuerpo de la solicitud
    const userId = req.body.userId;

    // Obtener los datos actualizados del cuerpo de la solicitud
    const { nombre, email, password, isAdmin } = req.body;

    // Obtener el usuario existente
    const usuario = await modelos.Usuarios.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Validar que solo se actualicen campos permitidos (ajusta según tus necesidades)
    const camposActualizables = {
      username: nombre,
      email: email,
      isAdmin: isAdmin,
    };

    // Si se proporciona una nueva contraseña, actualizarla
    if (password) {
      camposActualizables.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    // Actualizar el usuario en la base de datos
    await usuario.update(camposActualizables);

    console.log('Usuario actualizado con éxito');
    res.status(200).json({ mensaje: "Usuario actualizado con éxito" });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno al actualizar usuario', error });
  }
};

exports.borrarUsuario = function(req, res) {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ mensaje: 'ID del usuario no proporcionada en el cuerpo de la solicitud' });
    }

    modelos.Usuarios.destroy({
        where: { id: userId }
    })
    .then(() => {
        console.log('Usuario eliminado con éxito');
        res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno al eliminar usuario', error });
    });
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