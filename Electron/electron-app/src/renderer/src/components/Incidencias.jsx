import React, { useState, useEffect } from "react";
import '../assets/Usuarios.css';
import FormIncidencia from "./FormIncidencia";
// import FormIncidencia from './FormIncidencia';

export default function Incidencias() {
  const [incidences, setIncidences] = useState([]);
  const [showIncidencesList, setShowIncidencesList] = useState(true);
  const [editIncidenceId, setEditIncidenceId] = useState(null);

const handleEditIncidence = (incidenceId) => {
  setEditIncidenceId(incidenceId);
  setShowIncidencesList(!showIncidencesList);

};

const toggleAddIncidenceForm = () => {
  fetchIncidencies();
setShowIncidencesList(!showIncidencesList);
setEditIncidenceId(null); // Resetear editUserId al volver
};

const handleDeleteIncidence = async (incidenceId) => {
  try {
    const response = await fetch('http://10.10.12.205:3000/api/v1/deleteIncidence', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ incidenceId }),
    });

    if (response.ok) {
      alert(`Incidencia "${incidenceId}" eliminada con éxito`);
      fetchIncidencies(); // Actualizar la lista de usuarios después de eliminar uno
    } else {
      const data = await response.json();
      alert(`Error al eliminar incidencia: ${incidenceId}`);
    }
  } catch (error) {
    alert(`Error al eliminar incidencia: ${incidenceId}`);
  }
};

  const fetchIncidencies = async () => {
    try {
      const response = await fetch('http://10.10.12.205:3000/api/v1/showIncidences');
      const data = await response.json();
      setIncidences(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchIncidencies();
  }, []);

  if(showIncidencesList){
    return(
      <div>
      <div id="cabecera">
        <h2>Lista de incidencias</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de incidencia</th>
            <th>Causa</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>latitud</th>
            <th>longitud</th>
            <th>Imagen/Camara</th>
            <th><button onClick={toggleAddIncidenceForm}>Agregar Incidencia</button></th>
          </tr>
        </thead>
        <tbody>
          {incidences.map((incidence) => (
            <tr key={incidence.id}>
              <td>{incidence.incidenceId}</td>
              <td>{incidence.incidenceType}</td>
              <td>{incidence.cause}</td>
              <td>{incidence.startDate}</td>
              <td>{incidence.endDate}</td>
              <td>{incidence.latitude}</td>
              <td>{incidence.longitude}</td>
              <td>
                {/* Muestra la imagen como una etiqueta de imagen */}
                {incidence.urlImage && (
                  <img
                    src={incidence.urlImage}
                    alt={`Imagen de la incidencia ${incidence.incidenceId}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleEditIncidence(incidence.incidenceId)}>Editar</button>
                <button id="delButton" onClick={() => handleDeleteIncidence(incidence.incidenceId)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }else{
    console.log(editIncidenceId)
    return(
      <div className="popup-overlay">
          <div id="cabecera">
            <h2>{editIncidenceId ? 'Editar incidencia' : 'Añadir incidencia'}</h2>
            <button onClick={toggleAddIncidenceForm}>Volver</button>
          </div>
          <FormIncidencia
            onClose={() => {
            toggleAddIncidenceForm();
            setEditIncidenceId(null); // Resetear editUserId al cerrar el formulario
            }}
            editIncidenceId={editIncidenceId}
          />
        </div>
    );
  };
}