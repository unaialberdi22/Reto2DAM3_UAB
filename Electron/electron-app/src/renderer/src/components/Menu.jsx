// Menu.jsx
import React from 'react';
import '../assets/Menu.css'; // Asegúrate de tener el archivo CSS correspondiente

const Menu = ({ onMenuClick }) => {
  return (
    <div className="menu">
      <div onClick={() => onMenuClick('addUser')}>Añadir Usuario</div>
      <div onClick={() => onMenuClick('addIncident')}>Añadir Incidencia</div>
      <div onClick={() => onMenuClick('viewData')}>Ver Datos</div>
    </div>
  );
};

export default Menu;