// Menu.jsx
import React from 'react';
import '../assets/Menu.css'; // Asegúrate de tener el archivo CSS correspondiente

const Menu = ({ onMenuClick }) => {
  return (
    <div className="menu">
      <div onClick={() => onMenuClick('User')}>Usuarios</div>
      <div onClick={() => onMenuClick('Incident')}>Incidencias</div>
      <div onClick={() => onMenuClick('Flows')}>Flows</div>
    </div>
  );
};

export default Menu;