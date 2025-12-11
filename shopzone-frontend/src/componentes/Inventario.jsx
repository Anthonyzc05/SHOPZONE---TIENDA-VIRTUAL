import React, { useState } from "react";
import "./styles/Inventario.css";

import {
  FaCog,
  FaUser,
  FaShoppingCart,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

import MetodoCompra from "./metodocompra";
import Administracion from "./administracion";
import Perfil from "./perfil";
import { useTranslation } from "react-i18next";

const productos = {
  Electrodomésticos: [
    { id: 1, nombre: "Refrigeradora Samsung", precio: 2400, imagen: process.env.PUBLIC_URL + "/images/refrigeradora.jpg" },
    { id: 2, nombre: "Licuadora Oster", precio: 250, imagen: process.env.PUBLIC_URL + "/images/LicuadoraOster.jpg" },
    { id: 3, nombre: "Horno microondas LG", precio: 450, imagen: process.env.PUBLIC_URL + "/images/Hornomicroondas LG.jpg" },
    { id: 4, nombre: "Cocina Indurama", precio: 1500, imagen: process.env.PUBLIC_URL + "/images/cocina.jpg" },
    { id: 5, nombre: "Televisor Smart 55''", precio: 2900, imagen: process.env.PUBLIC_URL + "/images/TelevisorSmart.webp" },
    { id: 6, nombre: "Aspiradora Philips", precio: 700, imagen: process.env.PUBLIC_URL + "/images/aspiradora.jpg" },
  ],

  Ropa: [
    { id: 7, nombre: "Casaca de cuero", precio: 350, imagen: process.env.PUBLIC_URL + "/images/Casacadecuero.jpg" },
    { id: 8, nombre: "Pantalón jeans", precio: 120, imagen: process.env.PUBLIC_URL + "/images/Pantalonjeans.jpg" },
    { id: 9, nombre: "Polera Adidas", precio: 180, imagen: process.env.PUBLIC_URL + "/images/PoleraAdidas.jpg" },
    { id: 10, nombre: "Camisa blanca", precio: 90, imagen: process.env.PUBLIC_URL + "/images/Camisablanca.jpg" },
    { id: 11, nombre: "Zapatillas Nike", precio: 420, imagen: process.env.PUBLIC_URL + "/images/ZapatillasNike.jpg" },
    { id: 12, nombre: "Gorro de lana", precio: 60, imagen: process.env.PUBLIC_URL + "/images/Gorrodelana.jpg" },
  ],

  Objetos: [
    { id: 13, nombre: "Reloj de pared", precio: 80, imagen: process.env.PUBLIC_URL + "/images/Relojdepared.jpg" },
    { id: 14, nombre: "Jarrón decorativo", precio: 150, imagen: process.env.PUBLIC_URL + "/images/Jarrondecorativo.jpg" },
    { id: 15, nombre: "Set de cubiertos", precio: 200, imagen: process.env.PUBLIC_URL + "/images/Setdecubiertos.jpg" },
    { id: 16, nombre: "Cuadro moderno", precio: 300, imagen: process.env.PUBLIC_URL + "/images/Cuadromoderno.jpg" },
    { id: 17, nombre: "Lámpara de mesa", precio: 250, imagen: process.env.PUBLIC_URL + "/images/Lamparademesa.jpg" },
    { id: 18, nombre: "Portaretratos", precio: 70, imagen: process.env.PUBLIC_URL + "/images/Portaretratos.jpg" },
  ],

  Alimentos: [
    { id: 19, nombre: "Cereal", precio: 16, imagen: process.env.PUBLIC_URL + "/images/cereal.jpg" },
    { id: 20, nombre: "Jamón", precio: 25, imagen: process.env.PUBLIC_URL + "/images/jamon.jpg" },
    { id: 21, nombre: "Manzana", precio: 2.5, imagen: process.env.PUBLIC_URL + "/images/manzana.jpg" },
    { id: 22, nombre: "Pan", precio: 3, imagen: process.env.PUBLIC_URL + "/images/pan.jpg" },
    { id: 23, nombre: "Torta", precio: 45, imagen: process.env.PUBLIC_URL + "/images/torta.jpg" },
    { id: 24, nombre: "Empanada", precio: 14, imagen: process.env.PUBLIC_URL + "/images/empanada.jpg" },
  ],
};

function Inventario() {
  const { t } = useTranslation();
  const moneda = t("currency_symbol");

  const [categoriaActiva, setCategoriaActiva] = useState("Electrodomésticos");
  const [carrito, setCarrito] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [animacionId, setAnimacionId] = useState(null);

  const agregarCarrito = (producto) => {
    setCarrito([...carrito, producto]);

    setAnimacionId(producto.id);
    setTimeout(() => setAnimacionId(null), 300);
  };

  const eliminarProducto = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const cerrarSesion = () => {
    alert(t("inventario.sesionCerrada"));
    window.location.href = "/";
  };

  return (
    <div className="inventario-container">
      {/* HEADER */}
      <header className="inventario-header">
        <h1>{t("inventario.titulo")}</h1>

        <nav>
          {Object.keys(productos).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={categoriaActiva === cat ? "activo" : ""}
            >
              {t(`inventario.categorias.${cat}`)}
            </button>
          ))}
        </nav>

        {/* MENÚ */}
        <div className="configuracion">
          <FaCog className="config-icon" onClick={() => setMenuAbierto(!menuAbierto)} />

          {menuAbierto && (
            <div className="menu-opciones">
              <div onClick={() => setMostrarPerfil(true)}>
                <FaUser /> {t("inventario.perfil")}
              </div>

              <div onClick={() => setMostrarCarrito(true)}>
                <FaShoppingCart /> {t("inventario.carrito")} ({carrito.length})
              </div>

              <div onClick={() => setMostrarAdmin(true)}>
                <FaComments /> {t("inventario.admin")}
              </div>

              <div onClick={cerrarSesion}>
                <FaSignOutAlt /> {t("inventario.cerrarSesion")}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* PRODUCTOS */}
      <div className="productos-grid">
        {productos[categoriaActiva].map((prod) => (
          <div
            key={prod.id}
            className={`producto-card ${animacionId === prod.id ? "animar" : ""}`}
          >
            <img src={prod.imagen} alt={prod.nombre} />
            <h3>{t(`inventario.productos.${prod.nombre}`)}</h3>
            <p>{moneda} {prod.precio}</p>

            <button onClick={() => agregarCarrito(prod)}>
              {t("inventario.agregarCarrito")}
            </button>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      {mostrarCarrito && (
        <div className="carrito-overlay">
          <div className="carrito-modal">
            <h2>{t("inventario.carritoTitulo")}</h2>

            {carrito.length === 0 ? (
              <p>{t("inventario.carritoVacio")}</p>
            ) : (
              carrito.map((item, index) => (
                <div key={index} className="carrito-item">
                  <img src={item.imagen} alt={item.nombre} />

                  <div className="info">
                    <p>{t(`inventario.productos.${item.nombre}`)}</p>
                    <p>{moneda} {item.precio}</p>
                  </div>

                  <button className="btn-eliminar" onClick={() => eliminarProducto(index)}>
                    ✖
                  </button>
                </div>
              ))
            )}

            <button className="btn-proceder" onClick={() => carrito.length > 0 ? setMostrarPago(true) : alert(t("inventario.carritoVacio"))}>
              {t("inventario.procederPago")}
            </button>

            <button className="btn-cerrar" onClick={() => setMostrarCarrito(false)}>
              {t("inventario.cerrar")}
            </button>
          </div>
        </div>
      )}

      {mostrarPago && (
        <MetodoCompra
          onConfirm={() => {
            setCarrito([]);
            setMostrarPago(false);
            setMostrarCarrito(false);
          }}
        />
      )}

      {mostrarAdmin && <Administracion onClose={() => setMostrarAdmin(false)} />}
      {mostrarPerfil && <Perfil onClose={() => setMostrarPerfil(false)} />}
    </div>
  );
}

export default Inventario;


