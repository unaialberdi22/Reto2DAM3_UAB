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
        Incidence Type:
        <select
          value={incidenceType}
          onChange={(e) => setIncidenceType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </label>

      <label>
        Cause:
        <input
          type="text"
          value={cause}
          onChange={(e) => setCause(e.target.value)}
        />
      </label>

      <label>
        Start Date:
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </label>

      <label>
        End Date:
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </label>

      <label>
        Latitude:
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>

      <label>
        Longitude:
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>

      <label>
        Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>

      <button type="submit">Add Incident</button>
    </form>
  );
};

export default FormIncidencia;
