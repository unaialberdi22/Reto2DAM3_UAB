import React, { useState, useEffect } from "react";
import '../assets/Usuarios.css';
// import FormIncidencia from './FormIncidencia';

export default function Incidencias() {
  const [incidences, setIncidences] = useState([]);
//   const [showAddUserForm, setShowAddUserForm] = useState(false);
//   const [showUsersList, setShowUsersList] = useState(true);
//   const [editUserId, setEditUserId] = useState(null);

  const toggleAddIncidenceForm = () => {
    fetchIncidencies();
    // setShowAddUserForm(!showAddUserForm);
    // setShowUsersList(!showUsersList);
    // setEditUserId(null); // Resetear editUserId al volver
  };

  const fetchIncidencies = async () => {
    try {
      const response = await fetch('http://10.10.12.205:3000/api/v1/showIncidences');
      const data = await response.json();
      setIncidences(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchIncidencies();
  }, []);

  return (
    <div className="user-list-container">
      {showUsersList && (
        <div>
          <div id="cabecera">
            <h2>Lista de incidencias</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID de incidencia</th>
                <th>Tipo de incidencia</th>
                <th>Causa</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>latitud</th>
                <th>longitud</th>
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
                    {/* <button onClick={() => handleEditUser(user.id, user.username)}>Editar</button> */}
                    <button id="delButton" onClick={() => handleDeleteUser(user.id, user.username)}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddUserForm && (
        <div className="popup-overlay">
          <div id="cabecera">
            <h2>{editUserId ? 'Editar incidencia' : 'Añadir incidencia'}</h2>
            <button onClick={toggleAddIncidenceForm}>Volver</button>
          </div>
          <FormUsuarios
            onClose={() => {
            toggleAddIncidenceForm();
            setEditUserId(null); // Resetear editUserId al cerrar el formulario
            }}
            editUserId={editUserId}
          />
        </div>
      )}
    </div>
  );
}