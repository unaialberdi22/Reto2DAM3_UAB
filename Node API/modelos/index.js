// index.js

require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
var registro = require('../controladores/registro');
var login = require('../controladores/login');

// Configurar Sequelize para usar mysql
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Importar modelos.
const Usuarios = require('./usuarios')(sequelize, Sequelize.DataTypes);

// Crear tablas pendientes:
sequelize.sync({force:true})
.then(function() {

    console.log('Tablas y modelos creados');
    // Creamos un usaurio admin de prueba
    registro.RegistrarUsuario('Unai','unaialberdi22@gmail.com','2dam3',true)
    .then(function(){
      //Se ha creado el usuario tiramos tres logins de prueba
      login.Login('unaialberdi22@gmail.com','2dam3')
      .then (function(a){
        console.log(a);
      }, function (err){
        console.log('Reject');
        console.log(err);
      })

      login.Login('unaialberdi22@gmail.com','prueba1')
      .then (function(a){
        console.log(a);
      }, function (err){
        console.log('Reject');
        console.log(err);
      })

      login.Login('pedro2@prueba.com','prueba')
      .then (function(a){
        console.log(a);
      }, function (err){
        console.log('Reject');
        console.log(err);
      })

    },function(err){
      console.log("Reject")
      console.log(err);
    });



  }, function (err) {
    console.log('Algo no fue bien: ', err);
  });
// Exportar modelos:

exports.Usuarios = Usuarios;