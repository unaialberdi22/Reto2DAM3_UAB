// App.jsx
import React, { useState } from 'react';
import Menu from './components/Menu';
import FormRegistro from './components/FormRegistro';
import FormIncidencia from './components/FormIncidencia';
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
        {selectedOption === 'addUser' && <div><FormRegistro/></div>}
        {selectedOption === 'addIncident' && <div><FormIncidencia/></div>}
        {selectedOption === 'viewData' && <div>Aquí va el componente de Ver Datos</div>}
      </div>
    </div>
  );
};

export default App;