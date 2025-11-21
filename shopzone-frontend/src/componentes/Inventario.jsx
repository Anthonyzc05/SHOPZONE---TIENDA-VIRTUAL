import React, { useState } from "react";
import "./styles/Inventario.css";
import { FaCog, FaUser, FaShoppingCart, FaComments, FaSignOutAlt } from "react-icons/fa";


import MetodoCompra from "./metodocompra";
import Administracion from "./administracion";
import Perfil from "./perfil";

const productos = {
  Electrodomésticos: [
    { id: 1, nombre: "Refrigeradora Samsung", precio: 2400, imagen: "/images/refrigeradora.jpg" },
    { id: 2, nombre: "Licuadora Oster", precio: 250, imagen: "/images/LicuadoraOster.jpg" },
    { id: 3, nombre: "Horno microondas LG", precio: 450, imagen: "/images/Hornomicroondas LG.jpg" },
    { id: 4, nombre: "Cocina Indurama", precio: 1500, imagen: "/images/cocina.jpg" },
    { id: 5, nombre: "Televisor Smart 55''", precio: 2900, imagen: "/images/TelevisorSmart.webp" },
    { id: 6, nombre: "Aspiradora Philips", precio: 700, imagen: "/images/aspiradora.jpg" },
  ],

  Ropa: [
    { id: 7, nombre: "Casaca de cuero", precio: 350, imagen: "/images/Casacadecuero.jpg" },
    { id: 8, nombre: "Pantalón jeans", precio: 120, imagen: "/images/Pantalonjeans.jpg" },
    { id: 9, nombre: "Polera Adidas", precio: 180, imagen: "/images/PoleraAdidas.jpg" },
    { id: 10, nombre: "Camisa blanca", precio: 90, imagen: "/images/Camisablanca.jpg" },
    { id: 11, nombre: "Zapatillas Nike", precio: 420, imagen: "/images/ZapatillasNike.jpg" },
    { id: 12, nombre: "Gorro de lana", precio: 60, imagen: "/images/Gorrodelana.jpg" },
  ],

  Objetos: [
    { id: 13, nombre: "Reloj de pared", precio: 80, imagen: "/images/Relojdepared.jpg" },
    { id: 14, nombre: "Jarrón decorativo", precio: 150, imagen: "/images/Jarrondecorativo.jpg" },
    { id: 15, nombre: "Set de cubiertos", precio: 200, imagen: "/images/Setdecubiertos.jpg" },
    { id: 16, nombre: "Cuadro moderno", precio: 300, imagen: "/images/Cuadromoderno.jpg" },
    { id: 17, nombre: "Lámpara de mesa", precio: 250, imagen: "/images/Lamparademesa.jpg" },
    { id: 18, nombre: "Portaretratos", precio: 70, imagen: "/images/Portaretratos.jpg" },
  ],
};

function Inventario() {
  const [categoriaActiva, setCategoriaActiva] = useState("Electrodomésticos");
  const [carrito, setCarrito] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const agregarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const cerrarSesion = () => {
    alert("Sesión cerrada correctamente");
    window.location.href = "/";
  };

  return (
    <div className="inventario-container">

      {/* HEADER */}
      <header className="inventario-header">
        <h1>ShopZone - Inventario</h1>

        <nav>
          {Object.keys(productos).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={categoriaActiva === cat ? "activo" : ""}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* MENÚ */}
        <div className="configuracion">
          <FaCog className="config-icon" onClick={() => setMenuAbierto(!menuAbierto)} />

          {menuAbierto && (
            <div className="menu-opciones">
              <div onClick={() => setMostrarPerfil(true)}>
                <FaUser /> Perfil
              </div>

              <div onClick={() => setMostrarCarrito(true)}>
                <FaShoppingCart /> Carrito ({carrito.length})
              </div>

              <div onClick={() => setMostrarAdmin(true)}>
                <FaComments /> Administración
              </div>

              <div onClick={cerrarSesion}>
                <FaSignOutAlt /> Cerrar sesión
              </div>
            </div>
          )}
        </div>
      </header>

      {/* PRODUCTOS */}
      <div className="productos-grid">
        {productos[categoriaActiva].map((prod) => (
          <div key={prod.id} className="producto-card">
            <img src={prod.imagen} alt={prod.nombre} />
            <h3>{prod.nombre}</h3>
            <p>S/. {prod.precio}</p>
            <button onClick={() => agregarCarrito(prod)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      {/* CARRITO MODAL */}
      {mostrarCarrito && (
        <div className="carrito-overlay">
          <div className="carrito-modal">
            <h2>🛒 Carrito de Compras</h2>

            {carrito.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              carrito.map((item, index) => (
                <div key={index} className="carrito-item">
                  <img src={item.imagen} alt={item.nombre} />

                  <div className="info">
                    <p>{item.nombre}</p>
                    <p>S/. {item.precio}</p>
                  </div>

                  <button className="btn-eliminar" onClick={() => eliminarProducto(index)}>
                    ✖
                  </button>
                </div>
              ))
            )}

            <button
              className="btn-proceder"
              onClick={() => {
                if (carrito.length === 0) return alert("Carrito vacío");
                setMostrarPago(true);
              }}
            >
              Proceder al pago
            </button>

            <button className="btn-cerrar" onClick={() => setMostrarCarrito(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* MÉTODO PAGO */}
      {mostrarPago && (
        <MetodoCompra
          onConfirm={() => {
            setCarrito([]);
            setMostrarPago(false);
            setMostrarCarrito(false);
          }}
        />
      )}

      {/* ADMINISTRACIÓN */}
      {mostrarAdmin && <Administracion onClose={() => setMostrarAdmin(false)} />}

      {/* PERFIL */}
      {mostrarPerfil && <Perfil onClose={() => setMostrarPerfil(false)} />}
    </div>
  );
}

export default Inventario;


