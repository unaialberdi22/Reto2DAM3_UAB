var modelos = require('../modelos');
var bcrypt = require('bcryptjs');

exports.Login = function(email, password) {
  var promesa = new Promise (function(resolve,reject){
    modelos.Usuarios.findOne({
            where: {
                email: email
            }
        })
        .then(function(usuario) {
            if (!usuario) {
                reject({ status: 404, mensaje: 'No existe el usuario' });
            } else {
              console.log('Usuario encontrado. Seguimos procesando');
              var hashed_password= usuario.password;
              if (bcrypt.compareSync(password, hashed_password)) {
                    console.log('login coorrecto');
                    resolve({ status: 200, mensaje: email });

                } else {
                    console.log('Login incorrecto');
                    reject({ status: 401, mensaje: 'Invalid Credentials !' });
                }
            }

        })
        .catch(function(err){
          console.log(err);
          reject({ status: 500, mensaje: 'Error interno' });
        })

  })
  return promesa;

}