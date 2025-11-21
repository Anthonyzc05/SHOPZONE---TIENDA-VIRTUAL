// src/App.jsx
import React, { useState } from "react";
import Login from "./componentes/Login";
import Inventario from "./componentes/Inventario";

function App() {
  const [usuario, setUsuario] = useState(null);

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
      {usuario ? (
        <Inventario onLogout={handleLogout} usuario={usuario} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
