const Sequelize = require('sequelize');
var modelos = require('../modelos');
var bcrypt = require('bcryptjs');

exports.RegistrarUsuario = function(nombre, email, password,isadmin) {
  var promesa = new Promise (function(resolve,reject){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    var nuevoUsuario = modelos.Usuarios.build({
        username: nombre,
        password: hash,
        email: email,
        isAdmin:isadmin
    });
    nuevoUsuario.save()
        .then(function(nuevoUsuario) {
            console.log('Usuario ' + nuevoUsuario.username + ' creado con éxito');
            resolve({ status: 200, mensaje: "Usuario creado con éxito" });
        })
        .catch(Sequelize.ValidationError, function(error) {
            console.log("Errores de validación:", error);
            for (var i in error.errors) {
                console.log('Error en el campo:', error.errors[i].value);
            };
            reject({ status: 400, mensaje: "Errores de validación " ,error});
        })
        .catch(function(error) {
            console.log("Error:", error);
            reject({ status: 500, mensaje: "Error interno" });
        });
  });
  return promesa;

}