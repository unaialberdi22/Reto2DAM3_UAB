// index.js
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const apiUrl = 'http://10.10.12.205:3000/api/v1';
// var registro = require('../controladores/registro');
// var login = require('../controladores/login');
// var usuarios = require('./controladores/usuarios.js');

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
const Incidencias = require('./incidencias')(sequelize, Sequelize.DataTypes);
// const Incidencias = require('./incidencias')(sequelize, Sequelize.DataTypes);

// Crear tablas pendientes:
sequelize.sync({force:true})
.then(function() {
    console.log('Tablas y modelos creados');
    // Creamos un usaurio admin de prueba
    // usuarios.RegistrarUsuario('Unai','unaialberdi22@gmail.com','2dam3',true)
    // .then(function(){
      const datosRegistro = {
        nombre: 'Unai',
        password: process.env.DB_PASSWORD,
        email: 'unaialberdi22@gmail.com',
        isAdmin: true,
      };

      const datosLogin = {
        password: process.env.DB_PASSWORD,
        email: 'unaialberdi22@gmail.com',
      };

      const datosIncidencia = {
        incidenceType:"Obra",
        cause:"Alcance",
        province:"GUIPUZCOA",
        startDate:"2023/08/02",
        endDate:"2023/08/02",
        latitude:"43.27871",
        longitude:"-2.32942",
        urlImage:"C:/Users/2dam3/Downloads/ImagenesReto/Logo.png",
      }

      axios.post(apiUrl + '/registro', datosRegistro)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response.data);
      });

      axios.post(apiUrl + '/addIncidence', datosIncidencia)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response.data);
      });

      axios.post(apiUrl + '/login', datosLogin)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response.data);
      });

      //Se ha creado el usuario tiramos tres logins de prueba
      // login.Login('unaialberdi22@gmail.com','2dam3')
      // .then (function(a){
      //   console.log(a);
      // }, function (err){
      //   console.log('Reject');
      //   console.log(err);
      // })

      // usuarios.autentificarUsuario('unaialberdi22@gmail.com','prueba1')
      // .then (function(a){
      //   console.log(a);
      // }, function (err){
      //   console.log('Reject');
      //   console.log(err);
      // })

      // usuarios.autentificarUsuario('pedro2@prueba.com','prueba')
      // .then (function(a){
      //   console.log(a);
      // }, function (err){
      //   console.log('Reject');
      //   console.log(err);
      // })

    },function(err){
      console.log("Reject")
      console.log(err);
    });



  // }, function (err) {
  //   console.log('Algo no fue bien: ', err);
  // });
// Exportar modelos:

exports.Usuarios = Usuarios;
exports.Incidencias = Incidencias;