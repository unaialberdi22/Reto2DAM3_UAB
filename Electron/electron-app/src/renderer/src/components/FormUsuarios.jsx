import React, { useState } from "react";
import '../assets/FormRegistro.css';

export default function FormUsuarios() {
  const API_ENDPOINT = 'http://10.10.12.205:3000/api/v1/';

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    isAdmin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name.toLowerCase()]: value,
      // Remove the condition for 'isAdmin' and set it directly to true
      isAdmin: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINT + "registro", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente a la API');
        alert(`Usuario "${formData.nombre}" registrado con éxito`);
        // Vaciar los campos del formulario
        setFormData({
          nombre: '',
          email: '',
          password: '',
          isAdmin: '',
        });
      } else {
        console.error('Error al enviar datos a la API');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}