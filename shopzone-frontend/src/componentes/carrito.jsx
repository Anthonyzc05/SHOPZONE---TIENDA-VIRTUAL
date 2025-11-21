import React from "react";
import "./styles/carrito.css";

function CarritoModal({ carrito, onClose, onDelete, onPagar }) {
  return (
    <div className="carrito-overlay">
      <div className="carrito-modal">

        <h2>🛒 Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío.</p>
        ) : (
          carrito.map((item, index) => (
            <div key={index} className="carrito-item">
              <img src={item.imagen} alt={item.nombre} />

              <div className="carrito-info">
                <p>{item.nombre}</p>
                <span>S/. {item.precio}</span>
              </div>

              <button className="eliminar-btn" onClick={() => onDelete(index)}>

              </button>
            </div>
          ))
        )}

        <div className="carrito-botones">
          <button className="btn-cerrar" onClick={onClose}>Cerrar</button>
          {carrito.length > 0 && (
            <button className="btn-comprar" onClick={onPagar}>
              Proceder al Pago
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarritoModal;
