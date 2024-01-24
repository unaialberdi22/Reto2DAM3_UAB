// App.jsx
import React, { useState } from 'react';
import Menu from './components/Menu';
import Usuarios from './components/Usuarios';
import Incidencias from './components/Incidencias';
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
        {selectedOption === 'Incident' && <div><Incidencias/></div>}
        {selectedOption === 'Flows' && <div></div>}
      </div>
    </div>
  );
};

export default App;