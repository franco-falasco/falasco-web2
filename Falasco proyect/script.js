// VARIABLES GLOBALES
const carrito = [];
const productos = document.querySelectorAll(".product-card");
const carritoBtn = document.querySelector("#ver-carrito");

// FUNCIONES
function agregarAlCarrito(producto) {
  const productoExistente = carrito.find(item => item.id === producto.id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  console.clear();
  console.log("Carrito:", carrito);
  const total = calcularTotal();
  console.log("Total: $" + total.toFixed(2));
}

function obtenerDatosProducto(card) {
  const id = card.getAttribute("data-id");
  const nombre = card.querySelector("h2").innerText;
  const precio = parseFloat(card.querySelector("strong").innerText.replace("$", ""));
  const imagen = card.querySelector("img").src;
  return { id, nombre, precio, imagen };
}

function calcularTotal() {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

// EVENTOS
productos.forEach(card => {
  const btn = card.querySelector("button");
  btn.addEventListener("click", () => {
    const producto = obtenerDatosProducto(card);
    agregarAlCarrito(producto);
  });
});

carritoBtn.addEventListener("click", () => {
  alert(`Tienes ${carrito.length} productos en el carrito.\nTotal: $${calcularTotal().toFixed(2)}`);
});