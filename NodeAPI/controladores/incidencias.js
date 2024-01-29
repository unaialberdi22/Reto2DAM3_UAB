const Sequelize = require('sequelize');
const modelos = require('../modelos');
var config = require('../config/config.json');


//Seccion Todos los Usuarios

//Seccion Registro
exports.añadirIncidencia = (req, res) => {
  
    const nuevaIncidencia = modelos.Incidencias.build({
        incidenceType:req.body.incidenceType,
        cause:req.body.cause,
        province:req.body.province,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        urlImage:req.body.urlImage,
    });
  
    nuevaIncidencia.save()
      .then((nuevaIncidencia) => {
        console.log('Incidencia ' + nuevaIncidencia.cause + ' creado con éxito');
  
        // Resto del código...
  
        // Envía la respuesta al cliente
        res.status(200).json({ mensaje: "Incidencia creada con éxito" });
      })
      .catch((error) => {
        
      });
  };

exports.obtenerIncidencia = async function(req, res) {
  console.log("DENTRO DE OBTENER INCIDENCIA")
  try {
    // Obtener el incidenceId del cuerpo de la solicitud
    const incidenceId = req.body.incidenceId;
    console.log(incidenceId)
    modelos.Incidencias.findAll({
        where: { incidenceId: incidenceId }
      })
    const incidencia = await modelos.Incidencias.findByPk(incidenceId);

    if (incidencia) {
      res.status(200).json({
        incidenceId:incidencia.incidenceId,
        incidenceType:incidencia.incidenceType,
        cause:incidencia.cause,
        province:incidencia.province,
        startDate:incidencia.startDate,
        endDate:incidencia.endDate,
        latitude:incidencia.latitude,
        longitude:incidencia.longitude,
        urlImage:incidencia.urlImage
      });
    } else {
      res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }
  } catch (error) {
    console.error('Error al obtener incidencia:', error);
    res.status(500).json({ mensaje: 'Error interno al obtener incidencia', error });
  }
};

exports.actualizarIncidencia = async function(req, res) {
  try {
    // Obtener el userId del cuerpo de la solicitud
    const incidenceId = req.body.incidenceId;

    // Obtener los datos actualizados del cuerpo de la solicitud
    const { incidenceType, cause,province, startDate, endDate, latitude, longitude, urlImage} = req.body;

    // Obtener el usuario existente
    const incidencia = await modelos.Incidencias.findByPk(incidenceId);

    if (!incidencia) {
      return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    // Validar que solo se actualicen campos permitidos (ajusta según tus necesidades)
    const camposActualizables = {
        incidenceType:incidenceType,
        cause:cause,
        province:province,
        startDate:startDate,
        endDate:endDate,
        latitude:latitude,
        longitude:longitude,
        urlImage:urlImage,
    };

    // Actualizar el usuario en la base de datos
    await incidencia.update(camposActualizables);

    console.log('Incidencia actualizada con éxito');
    res.status(200).json({ mensaje: "Incidencia actualizada con éxito" });
  } catch (error) {
    console.error('Error al actualizar incidencia:', error);
    res.status(500).json({ mensaje: 'Error interno al actualizar incidencia', error });
  }
};

exports.borrarIncidencia = function(req, res) {
    const incidenceId = req.body.incidenceId;

    if (!incidenceId) {
        return res.status(400).json({ mensaje: 'ID de la incidencia no proporcionada en el cuerpo de la solicitud' });
    }

    modelos.Incidencias.destroy({
        where: { incidenceId: incidenceId }
    })
    .then(() => {
        console.log('Incidencia eliminada con éxito');
        res.status(200).json({ mensaje: 'Incidencia eliminada con éxito' });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno al eliminar incidencia', error });
    });
}

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