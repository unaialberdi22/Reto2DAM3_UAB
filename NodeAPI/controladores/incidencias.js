const Sequelize = require('sequelize');
const modelos = require('../modelos');
var config = require('../config/config.json');
const incidencias = require('../modelos/incidencias');


//Seccion Todos los Usuarios

//Seccion Registro
exports.RegistrarUsuario = (req, res) => {
  
    const nuevoUsuario = modelos.Incidencias.build({
        incidenceId: req.body.incidenceId,
        incidenceType: req.body.incidenceId,
        cause: req.body.cause,
        startDate: req.body.startDate,
    });
  
    nuevoUsuario.save()
      .then((nuevoUsuario) => {
        console.log('Usuario ' + nuevoUsuario.username + ' creado con éxito');
  
        // Resto del código...
  
        // Envía la respuesta al cliente
        res.status(200).json({ mensaje: "Usuario creado con éxito" });
      })
      .catch((error) => {
        
      });
  };

// exports.obtenerUsuario = async function(req, res) {
//   try {
//     // Obtener el userId del cuerpo de la solicitud
//     const userId = req.body.userId;

//     const usuario = await modelos.Usuarios.findByPk(userId);

//     if (usuario) {
//       res.status(200).json({
//         id: usuario.id,
//         username: usuario.username,
//         email: usuario.email,
//         isAdmin: usuario.isAdmin,
//       });
//     } else {
//       res.status(404).json({ mensaje: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     console.error('Error al obtener usuario:', error);
//     res.status(500).json({ mensaje: 'Error interno al obtener usuario', error });
//   }
// };

// exports.actualizarUsuario = async function(req, res) {
//   try {
//     // Obtener el userId del cuerpo de la solicitud
//     const userId = req.body.userId;

//     // Obtener los datos actualizados del cuerpo de la solicitud
//     const { nombre, email, password, isAdmin } = req.body;

//     // Obtener el usuario existente
//     const usuario = await modelos.Usuarios.findByPk(userId);

//     if (!usuario) {
//       return res.status(404).json({ mensaje: "Usuario no encontrado" });
//     }

//     // Validar que solo se actualicen campos permitidos (ajusta según tus necesidades)
//     const camposActualizables = {
//       username: nombre,
//       email: email,
//       isAdmin: isAdmin,
//     };

//     // Si se proporciona una nueva contraseña, actualizarla
//     if (password) {
//       camposActualizables.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//     }

//     // Actualizar el usuario en la base de datos
//     await usuario.update(camposActualizables);

//     console.log('Usuario actualizado con éxito');
//     res.status(200).json({ mensaje: "Usuario actualizado con éxito" });
//   } catch (error) {
//     console.error('Error al actualizar usuario:', error);
//     res.status(500).json({ mensaje: 'Error interno al actualizar usuario', error });
//   }
// };

// exports.borrarUsuario = function(req, res) {
//     const userId = req.body.userId;

//     if (!userId) {
//         return res.status(400).json({ mensaje: 'ID del usuario no proporcionada en el cuerpo de la solicitud' });
//     }

//     modelos.Usuarios.destroy({
//         where: { id: userId }
//     })
//     .then(() => {
//         console.log('Usuario eliminado con éxito');
//         res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
//     })
//     .catch((error) => {
//         console.error(error);
//         res.status(500).json({ mensaje: 'Error interno al eliminar usuario', error });
//     });
// }

exports.mostrarIncidencias = function(req, res) {
    modelos.Incidencias.findAll()
        .then(incidencias => {
            res.status(200).json(incidencias);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno al obtener incidencias' });
        });
}