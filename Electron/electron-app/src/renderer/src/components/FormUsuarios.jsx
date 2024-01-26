import React, { useState, useEffect } from "react";
import '../assets/FormRegistro.css';

const API_ENDPOINT = 'http://10.10.12.205:3000/api/v1/';

const FormUsuarios = ({ onClose, editUserId }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    isAdmin: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Si hay un editUserId, cargar los datos del usuario para edición
    if (editUserId) {
      fetchUserData(editUserId);
    }
  }, [editUserId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const userData = await response.json();

      if (response.ok) {
        setFormData({
          nombre: userData.username,
          email: userData.email,
          isAdmin: userData.isAdmin,
        });
      } else {
        console.error(`Error al obtener datos del usuario: ${userData.mensaje}`);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name.toLowerCase()]: value,
      // Remove the condition for 'isAdmin' and set it directly to true
      isAdmin: true,
    });

    // Limpiar el error cuando el usuario comienza a escribir
    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar que el campo "Nombre" no esté vacío
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    // Validar que el campo "Email" sea un formato de correo electrónico válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    // Validar que el campo "Contraseña" tenga al menos 6 caracteres y contenga al menos una mayúscula
    const passwordPattern = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres y contener al menos una mayúscula';
    }

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviarlo
    if (!validateForm()) {
      return;
    }

    try {
      const url = editUserId
        ? `${API_ENDPOINT}updateUser`
        : `${API_ENDPOINT}registro`;

      const method = editUserId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: editUserId,
          ...formData,
        }),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente a la API');
        const action = editUserId ? 'editado' : 'registrado';
        alert(`Usuario "${formData.nombre}" ${action} con éxito`);
        // Vaciar los campos del formulario
        setFormData({
          nombre: '',
          email: '',
          password: '',
          isAdmin: '',
        });
        onClose();
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
            {errors.nombre && <span className="error-message" style={{ color: 'red' }}>{errors.nombre}</span>}
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
            {errors.email && <span className="error-message" style={{ color: 'red' }}>{errors.email}</span>}
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
            {errors.password && <span className="error-message" style={{ color: 'red' }}>{errors.password}</span>}
          </label>
          {/* Puedes agregar validaciones y mensajes de error para otros campos aquí */}
        </div>
        <div className="form-group">
          <button type="submit" id='botonEnviar'>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default FormUsuarios;
