import React, { useState, useEffect } from "react";
import "./styles/perfil.css";

function Perfil({ onClose }) {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "", //SE AGREGARON LOS CAMPOS DE LOS USUARIOS
    email: "", 
  });

  // 🔹 Cargar datos guardados
  useEffect(() => {
    const datosGuardados = localStorage.getItem("perfilUsuario");
    if (datosGuardados) {
      setForm(JSON.parse(datosGuardados)); // LOS DATOS DE LOS CLIENTES SE GUARDARON CORRECTAMENTE
    }
  }, []);

  // 🔹 Guardar cambios
  const guardarCambios = () => {
    localStorage.setItem("perfilUsuario", JSON.stringify(form));
    alert("Datos guardados correctamente ✔"); //Datos Guardados Correctamente
  };

  // 🔹 Actualizar inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="perfil-overlay">
      <div className="perfil-modal">
        <h2>Mi Perfil</h2>

        <label>Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Tu nombre" //se solicita aqui el nombre del usuario que va a ingresar
        />

        <label>Dirección</label>
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Tu dirección" //Se solicitia la direccion 
        />

        <label>Teléfono</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Tu teléfono" // se pide su numero telefonico
        />

        <label>Email</label>
        <input
          name="email" 
          value={form.email}
          onChange={handleChange}
          placeholder="Tu correo" // se le pide su correo 
        />
            {/* 🔹 Si el usuario quiere cambiar sus datos, se guardaran aqui*/} 
        <div className="perfil-botones"> 
          <button className="btn-guardar" onClick={guardarCambios}> 
            Guardar 
          </button>   

          {/* 🔹 Botón regresar que sí funciona */}
          <button className="btn-regresar" onClick={onClose}>  
            Regresar
          </button> 
        </div>
      </div>
    </div>
  );
}

export default Perfil;
