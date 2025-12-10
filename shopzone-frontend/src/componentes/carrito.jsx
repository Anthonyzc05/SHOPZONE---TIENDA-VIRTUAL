import React from "react";
import "./styles/carrito.css";
import { useTranslation } from "react-i18next";

function CarritoModal({ carrito, onClose, onDelete, onPagar }) {
  const { t } = useTranslation();
  const moneda = t("currency_symbol");

  return (
    <div className="carrito-overlay">
      <div className="carrito-modal">

        <h2>🛒 {t("carrito.title")}</h2>

        {carrito.length === 0 ? (
          <p className="carrito-vacio">{t("carrito.vacio")}</p>
        ) : (
          carrito.map((item, index) => (
            <div key={index} className="carrito-item">
              <img src={item.imagen} alt={item.nombre} />

              <div className="carrito-info">
                <p>{t(`inventario.productos.${item.nombre}`)}</p>
                <span>{t("currency_symbol")} {item.precio}</span>
              </div>

              <button className="eliminar-btn" onClick={() => onDelete(index)}>
                ✖
              </button>
            </div>
          ))
        )}

        <div className="carrito-botones">
          <button className="btn-cerrar" onClick={onClose}>
            {t("carrito.cerrar")}
          </button>

          {carrito.length > 0 && (
            <button className="btn-comprar" onClick={onPagar}>
              {t("carrito.pagar")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarritoModal;

