import React, { useState } from "react";
import "./styles/administracion.css";
import { useTranslation } from "react-i18next";

function Administracion({ onClose }) {
  const { t } = useTranslation();

  const [mensajes, setMensajes] = useState([
    { de: t("admin.soporte"), texto: t("admin.mensaje_inicio") }
  ]);

  const [texto, setTexto] = useState("");

  const enviarMensaje = () => {
    if (!texto.trim()) return;

    setMensajes([...mensajes, { de: t("admin.tu"), texto }]);

    setTexto("");

    setTimeout(() => {
      setMensajes((prev) => [
        ...prev,
        {
          de: t("admin.soporte"),
          texto: t("admin.mensaje_auto")
        }
      ]);
    }, 1000);
  };

  return (
    <div className="admin-overlay">
      <div className="admin-modal">
        <h2>📦 {t("admin.title")}</h2>

        <div className="chat-box">
          {mensajes.map((m, i) => (
            <p key={i} className={m.de === t("admin.tu") ? "yo" : "ellos"}>
              <strong>{m.de}:</strong> {m.texto}
            </p>
          ))}
        </div>

        <input
          value={texto}
          placeholder={t("admin.placeholder")}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button className="btn-enviar" onClick={enviarMensaje}>
          {t("admin.enviar")}
        </button>

        <button className="btn-cerrar" onClick={onClose}>
          {t("admin.cerrar")}
        </button>
      </div>
    </div>
  );
}

export default Administracion;
