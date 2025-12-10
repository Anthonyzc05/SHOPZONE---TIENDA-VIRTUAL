import React, { useState, useEffect } from "react";
import "./styles/perfil.css";
import { useTranslation } from "react-i18next";

function Perfil({ onClose }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  // 🔹 Cargar datos guardados
  useEffect(() => {
    const datosGuardados = localStorage.getItem("perfilUsuario");
    if (datosGuardados) {
      setForm(JSON.parse(datosGuardados));
    }
  }, []);

  // 🔹 Guardar cambios
  const guardarCambios = () => {
    localStorage.setItem("perfilUsuario", JSON.stringify(form));
    alert(t("perfil.guardado"));
  };

  // 🔹 Actualizar inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="perfil-overlay">
      <div className="perfil-modal">
        <h2>{t("perfil.title")}</h2>

        <label>{t("perfil.nombre")}</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder={t("perfil.nombrePlaceholder")}
        />

        <label>{t("perfil.direccion")}</label>
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder={t("perfil.direccionPlaceholder")}
        />

        <label>{t("perfil.telefono")}</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder={t("perfil.telefonoPlaceholder")}
        />

        <label>{t("perfil.email")}</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("perfil.emailPlaceholder")}
        />

        <div className="perfil-botones">
          <button className="btn-guardar" onClick={guardarCambios}>
            {t("perfil.guardar")}
          </button>

          <button className="btn-regresar" onClick={onClose}>
            {t("perfil.regresar")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
