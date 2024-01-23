// Menu.jsx
import React from 'react';
import '../assets/Menu.css'; // Asegúrate de tener el archivo CSS correspondiente
import Logo from '../assets/Logo.png';
const Menu = ({ onMenuClick }) => {
  return (
    <div className="menu">
      <div onClick={() => onMenuClick('User')}>Usuarios</div>
      <div onClick={() => onMenuClick('Incident')}>Incidencias</div>
      <div onClick={() => onMenuClick('Flows')}>Flows</div>
      <img src={Logo} alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }}/>
    </div>
  );
};

export default Menu;