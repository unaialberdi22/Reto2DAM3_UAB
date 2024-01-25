// FormIncidencia.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // Necesitarás instalar 'react-datepicker' si aún no lo has hecho
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/FormRegistro.css';

const API_ENDPOINT = 'http://10.10.12.205:3000/api/v1/';

const FormIncidencia = ({ onClose, editIncidenceId }) => {
  const [formData, setFormData] = useState({
    incidenceType: '',
    cause: '',
    startDate: null,
    endDate: null,
    latitude: '',
    longitude: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Si hay un editUserId, cargar los datos del usuario para edición
    if (editIncidenceId) {
      fetchIncidenceData(editIncidenceId);
    }
  }, [editIncidenceId]);

  useEffect(() => {
    console.log(formData.startDate)
    console.log(formData.endDate)
  }, [formData.startDate, formData.endDate]);

  const fetchIncidenceData = async (editIncidenceId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}getIncidence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ editIncidenceId }),
      });
      const userData = await response.json();

      if (response.ok) {
        setFormData({
          nombre: userData.username,
          email: userData.email,
          isAdmin: userData.isAdmin,
        });
      } else {
        console.error(`Error al obtener datos del usuario: ${userData.mensaje}`);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Validar el formulario antes de enviarlo
    // if (!validateForm()) {
    //   return;
    // }

    try {
      const url = editIncidenceId
        ? `${API_ENDPOINT}updateIncidence`
        : `${API_ENDPOINT}addIncidence`;

      const method = editIncidenceId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          incidenceId: editIncidenceId,
          ...formData,
        }),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente a la API');
        const action = editIncidenceId ? 'editada' : 'añadida';
        alert(`Incidencia "${formData.cause}" ${action} con éxito`);
        // Vaciar los campos del formulario
        setFormData({
          incidenceType: '',
          cause: '',
          startDate: null,
          endDate: null,
          latitude: '',
          longitude: '',
        });
        onClose();
      } else {
        console.error('Error al enviar datos a la API');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Tipo de incidencia:
            <select
              name="incidenceType"
              value={formData.incidenceType}
              onChange={handleChange}
            >
              <option value="">*Selecionar tipo*</option>
              <option value="Meteorológica">Meteorológica</option>
              <option value="Accidente">Accidente</option>
              <option value="Retención">Retención</option>
              <option value="Seguridad vial">Seguridad vial</option>
              <option value="Puertos de montaña">Puertos de montaña</option>
              <option value="Vialidad invernal tramos">Vialidad invernal tramos</option>
              <option value="Pruebas deportivas">Pruebas deportivas</option>
              <option value="Otras incidencias">Otras incidencias</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
          </label>
        </div>
        <div className="form-group">
        <label>
        Causa:
        <input
          type="text"
          name="cause"
          value={formData.cause}
          onChange={handleChange}
        />
      </label>
        </div>
        <div className="form-group">
          <label>
          Fecha inicio:
          <DatePicker selected={formData.startDate} onChange={(date) => setFormData({ ...formData, startDate: date })} dateFormat="dd/MM/yyyy"/>
          </label>
        </div>
        <div className="form-group">
          <label>
          Fecha fin:
          <DatePicker selected={formData.endDate} onChange={(date) => setFormData({ ...formData, endDate: date })} dateFormat="dd/MM/yyyy"/>
          </label>
        </div>
        <div className="form-group">
          <label>
          Latitud:
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          </label>
        </div>
        <div className="form-group">
          <label>
          Longitud:
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          </label>
        </div>
        <div className="form-group">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tipo de incidencia:
        <select
          value={incidenceType}
          onChange={(e) => setIncidenceType(e.target.value)}
        >
          <option value="">*Selecionar tipo*</option>
          <option value="type1">Meteorológica</option>
          <option value="type2">Accidente</option>
          <option value="type3">Retención</option>
          <option value="type4">Seguridad vial</option>
          <option value="type5">Puertos de montaña</option>
          <option value="type6">Vialidad invernal tramos</option>
          <option value="type7">Pruebas deportivas</option>
          <option value="type8">Otras incidencias</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </label>

      <label>
        Causa:
        <input
          type="text"
          value={cause}
          onChange={(e) => setCause(e.target.value)}
        />
      </label>

      <label>
        Fecha inicio:
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </label>

      <label>
        Fecha fin:
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </label>

      <label>
        Latitud:
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>

      <label>
        Longitud:
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>

      <label>
        Imagen:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>

      <button type="submit">Añadir Incidencia</button>
    </form>
  );
};

export default FormIncidencia;
