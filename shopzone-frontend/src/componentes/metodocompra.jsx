import React, { useState } from "react";
import "./styles/metodocompra.css";

function MetodoCompra({ onConfirm }) {
  const [form, setForm] = useState({
    nombre: "",
    tarjeta: "",
    fecha: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const confirmar = () => {
    if (!form.nombre || !form.tarjeta || !form.fecha || !form.cvv) {
      alert("Completa todos los campos");
      return;
    }

    alert("✔ Compra realizada con éxito. ¡Gracias por tu compra!");
    onConfirm();
  };

  return (
    <div className="metodo-overlay">
      <div className="metodo-container">
        <h2>Método de Pago</h2>

        <input
          name="nombre"
          placeholder="Nombre en la tarjeta"
          onChange={handleChange}
        />
        <input
          name="tarjeta"
          placeholder="Número de tarjeta"
          onChange={handleChange}
          maxLength={16}
        />
        <input
          name="fecha"
          placeholder="MM/AA"
          onChange={handleChange}
          maxLength={5}
        />
        <input
          name="cvv"
          placeholder="CVV"
          onChange={handleChange}
          maxLength={4}
        />

        <button className="btn-comprar" onClick={confirmar}>
          Confirmar Compra
        </button>

        <button className="btn-cerrar" onClick={onConfirm}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default MetodoCompra;
