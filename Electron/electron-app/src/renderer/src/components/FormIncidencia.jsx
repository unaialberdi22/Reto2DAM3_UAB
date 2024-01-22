// FormIncidencia.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Necesitarás instalar 'react-datepicker' si aún no lo has hecho
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/FormIncidencia.css';

const FormIncidencia = ({ onSubmit }) => {
  const [incidenceType, setIncidenceType] = useState('');
  const [cause, setCause] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      incidenceType,
      cause,
      startDate,
      endDate,
      latitude,
      longitude,
      image,
    };

    onSubmit(formData);
  };

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
