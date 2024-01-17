import React, { useContext, useEffect, useState, useLayoutEffect, useRef, prevState } from "react";
import '../assets/index.css';

export default function FormRegistro() {

    const API_ENDPOINT = 'http://10.10.12.205:3000/api/v1/';
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      isAdmin: false,
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          console.log('Datos enviados correctamente a la API');
        } else {
          console.error('Error al enviar datos a la API');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    async function test() {
      try {
        const response = await fetch(API_ENDPOINT);
        const result = await response.json();
        console.log(result)
      } catch (error) {
        console.log('error', error);
      }
    }

    return (
      <div className="Registro">
        <h1>Formulario de Registro</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Es Admin:
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={() => test()}>Enviar</button>
        </form>
      </div>
    );
}