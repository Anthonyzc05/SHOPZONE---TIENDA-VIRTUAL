import React, { useState } from "react";
import { useTranslation } from "react-i18next";     // <<< IMPORTANTE
import "./styles/Login.css";

function Login({ onLoginSuccess }) {
  const { t } = useTranslation();                  // <<< IMPORTANTE

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modo, setModo] = useState("login"); // login o registro

  // REGISTRO
  const registrar = async () => {
    if (!email || !password) {
      alert(t("fill_all_fields"));
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert(t("cannot_register"));
        return;
      }

      alert(t("user_registered"));
      setModo("login");
    } catch (err) {
      alert(t("server_error"));
    }
  };

  // LOGIN
  const login = async () => {
    if (!email || !password) {
      alert(t("fill_all_fields"));
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
        alert(t("welcome") + " " + email);
        onLoginSuccess(email);
      } else {
        alert(t("invalid_credentials"));
      }
    } catch (err) {
      alert(t("server_error"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-blur-bg"></div>
      <div className="login-box">
        <h2>
          {modo === "login" ? t("login_title") : t("register_title")}
        </h2>

        <input
          type="text"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {modo === "login" ? (
          <>
            <button onClick={login}>{t("login_button")}</button>
            <p>
              {t("no_account")}{" "}
              <span onClick={() => setModo("registro")}>
                {t("register_here")}
              </span>
            </p>
          </>
        ) : (
          <>
            <button onClick={registrar}>{t("register_button")}</button>
            <p>
              {t("have_account")}{" "}
              <span onClick={() => setModo("login")}>
                {t("login_here")}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
