import React, { useState } from "react";
import "./styles/administracion.css";

function Administracion({ onClose }) {
  const [mensajes, setMensajes] = useState([
    { de: "Soporte", texto: "Hola 👋 ¿En qué puedo ayudarte?" }
  ]);
  const [texto, setTexto] = useState("");

  const enviarMensaje = () => {
    if (!texto.trim()) return;

    setMensajes([...mensajes, { de: "Tú", texto }]);

    setTexto("");

    setTimeout(() => {
      setMensajes((prev) => [
        ...prev,
        {
          de: "Soporte",
          texto: "Tu pedido llegará hoy entre 3:00 pm y 4:00 pm 🚚"
        }
      ]);
    }, 1000);
  };

  return (
    <div className="admin-overlay">
      <div className="admin-modal">
        <h2>📦 Administración</h2>

        <div className="chat-box">
          {mensajes.map((m, i) => (
            <p key={i} className={m.de === "Tú" ? "yo" : "ellos"}>
              <strong>{m.de}:</strong> {m.texto}
            </p>
          ))}
        </div>

        <input
          value={texto}
          placeholder="Escribe tu mensaje..."
          onChange={(e) => setTexto(e.target.value)}
        />

        <button className="btn-enviar" onClick={enviarMensaje}>Enviar</button>

        <button className="btn-cerrar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Administracion;
