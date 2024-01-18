const Sequelize = require('sequelize');
const modelos = require('../modelos');
const bcrypt = require('bcryptjs');

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