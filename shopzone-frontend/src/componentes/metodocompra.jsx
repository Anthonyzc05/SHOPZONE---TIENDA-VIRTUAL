import React, { useState } from "react";
import "./styles/metodocompra.css";
import { useTranslation } from "react-i18next";

function MetodoCompra({ onConfirm }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    nombre: "",
    tarjeta: "",
    fecha: "",
    cvv: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const confirmar = () => {
    if (!form.nombre || !form.tarjeta || !form.fecha || !form.cvv) {
      alert(t("pago.completalo"));
      return;
    }

    alert(t("pago.exito"));
    onConfirm();
  };

  return (
    <div className="metodo-overlay">
      <div className="metodo-container">
        <h2>{t("pago.title")}</h2>

        <input
          name="nombre"
          placeholder={t("pago.nombre")}
          onChange={handleChange}
        />

        <input
          name="tarjeta"
          placeholder={t("pago.tarjeta")}
          onChange={handleChange}
          maxLength={16}
        />

        <input
          name="fecha"
          placeholder={t("pago.fecha")}
          onChange={handleChange}
          maxLength={5}
        />

        <input
          name="cvv"
          placeholder={t("pago.cvv")}
          onChange={handleChange}
          maxLength={4}
        />

        <button className="btn-comprar" onClick={confirmar}>
          {t("pago.confirmar")}
        </button>

        <button className="btn-cerrar" onClick={onConfirm}>
          {t("pago.cancelar")}
        </button>
      </div>
    </div>
  );
}

export default MetodoCompra;

