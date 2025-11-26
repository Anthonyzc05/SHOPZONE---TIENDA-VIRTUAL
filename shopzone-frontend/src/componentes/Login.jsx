import React, { useState } from "react";
import "./styles/Login.css";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modo, setModo] = useState("login"); // login o registro

  // REGISTRO
  const registrar = async () => {
    if (!email || !password) {
      alert("Completa todos los campos obligatoriamente");  // agregamos las alertas como condicion
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("No se pudo registrar");
        return;
      }

      alert("Usuario registrado correctamente");
      setModo("login");
    } catch (err) {
      alert("Error al conectar con el servidor");
    }
  };

  //  login 
  const login = async () => {
    if (!email || !password) {
      alert("Completa todos los campos obligatoriamente"); // alertas 
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const mensaje = await res.text();

  

      if (mensaje.includes("exitoso")) {
        alert("Bienvenido a shopzone estimado" + email);
        onLoginSuccess(email);
      } else {
        alert(" Credenciales incorrectas, intentalo de nuevo");
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-blur-bg"></div>
      <div className="login-box">
        <h2>{modo === "login" ? "Inicia Sesión" : "Regístrate"}</h2>

        <input
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {modo === "login" ? (
          <>
            <button onClick={login}>Iniciar Sesión</button>
            <p>
              ¿No tienes cuenta?{" "}
              <span onClick={() => setModo("registro")}>Regístrate aquí</span>
            </p>
          </>
        ) : (
          <>
            <button onClick={registrar}>Registrar</button>
            <p>
              ¿Ya tienes cuenta?{" "}
              <span onClick={() => setModo("login")}>Inicia sesión aquí</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

