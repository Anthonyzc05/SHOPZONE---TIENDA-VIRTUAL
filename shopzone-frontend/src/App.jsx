// src/App.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";   // <<< IMPORTANTE
import Login from "./componentes/Login";
import Inventario from "./componentes/Inventario";

function App() {
  const [usuario, setUsuario] = useState(null);
  const { i18n } = useTranslation();  // <<< CAMBIAR DE IDIOMA

  // Cuando el login sea exitoso
  const handleLoginSuccess = (email) => {
    setUsuario(email);
  };

  // Cerrar sesión
  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <div>

      {/* ==== Selector de idioma ==== */}
      <div style={{ display: "flex", gap: "10px", margin: "10px" }}>
        <button onClick={() => i18n.changeLanguage("es")}>ES</button>
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      </div>

      {/* ==== Lógica de la App ==== */}
      {usuario ? (
        <Inventario onLogout={handleLogout} usuario={usuario} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
