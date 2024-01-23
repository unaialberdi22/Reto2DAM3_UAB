// App.jsx
import React, { useState } from 'react';
import Menu from './components/Menu';
import FormRegistro from './components/FormUsuarios';
import Usuarios from './components/Usuarios';
import './assets/App.css'; // Asegúrate de tener el archivo CSS correspondiente

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="app">
      <Menu onMenuClick={handleMenuClick} />
      <div className="main-content">
        {selectedOption === 'User' && <div><Usuarios/></div>}
        {selectedOption === 'addIncident' && <div></div>}
        {selectedOption === 'viewData' && <div></div>}
      </div>
    </div>
  );
};

export default App;