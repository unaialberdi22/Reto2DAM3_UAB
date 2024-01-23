import React, { useState, useEffect } from "react";
import '../assets/Usuarios.css'; // Puedes crear un archivo CSS para el estilo del componente
import FormUsuarios from './FormUsuarios'; // Asegúrate de ajustar la ruta y el nombre del archivo

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUsersList, setShowUsersList] = useState(true);

  const toggleAddUserForm = () => {
    fetchUsers();
    setShowAddUserForm(!showAddUserForm);
    setShowUsersList(!showUsersList);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://10.10.12.205:3000/api/v1/showUsers');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, username) => {
    try {
        const response = await fetch('http://10.10.12.205:3000/api/v1/deleteUser', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
  
        if (response.ok) {
          alert(`Usuario "${username}" eliminado con éxito`);
          fetchUsers(); // Actualizar la lista de usuarios después de eliminar uno
        } else {
          const data = await response.json();
          alert(`Error al eliminar usuario: ${username}`);
        }
      } catch (error) {
        alert(`Error al eliminar usuario: ${username}`);
      }
    };

  const handleEditUser = (userId) => {
    console.log(`Editar usuario con ID: ${userId}`);
  };

  return (
    <div className="user-list-container">
      {showUsersList && (
        <div>
          <div id="cabecera">
          <h2>Lista de usuarios</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Es administrador?</th>
                <th><button onClick={toggleAddUserForm}>Agregar Usuario</button></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Si' : 'No'}</td>
                  <td>
                    <button onClick={() => handleEditUser(user.id)}>Editar</button>
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
          <h2>Registrar usuario</h2>
          <button onClick={toggleAddUserForm}>Volver</button>
          </div>
          <FormUsuarios onClose={toggleAddUserForm} />
        </div>
      )}
    </div>
  );
};