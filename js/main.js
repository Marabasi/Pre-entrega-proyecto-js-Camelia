// Array de productos
const productos = [
  {
    id: 'Aceite',
    nombre: 'Aceites',
    imagen: './Img/Aceites-esenciales.jpg',
    precio: 150,
    cantidad: 10 // Cantidad inicial en stock
  },
  {
    id: 'Velas',
    nombre: 'Velas',
    imagen: './Img/Velas-de-miel.jpg',
    precio: 50,
    cantidad: 5
  },
  {
    id: 'Adornos',
    nombre: 'Adornos',
    imagen: './Img/Elefante.jpg',
    precio: 350,
    cantidad: 3
  },
  {
    id: 'Hornitos',
    nombre: 'Hornitos',
    imagen: './Img/Hornitos.jpg',
    precio: 300,
    cantidad: 7
  },
  {
    id: 'Inciensos',
    nombre: 'Inciensos',
    imagen: './Img/Inciensos.jpg',
    precio: 150,
    cantidad: 8
  }
];


// // Función para cargar productos desde el almacenamiento local o usar datos predeterminados
// function cargarProductos() {
//   const productosGuardados = localStorage.getItem('productos');
//   if (productosGuardados) {
//     return JSON.parse(productosGuardados);
//   }
//   return productos;
// }

// // Inicializar productos y carrito
// let productosEnStock = cargarProductos();
// const carrito = [];

// // Función para renderizar productos en la página
// function renderizarProductos() {
//   const contenedorProductos = document.querySelector('.contenedor-productos');
//   contenedorProductos.innerHTML = '';

//   productosEnStock.forEach(producto => {
//     const productoElement = document.createElement('div');
//     productoElement.classList.add('producto');
//     productoElement.innerHTML = `
//       <div class="cajita">
//         <img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}" title="${producto.nombre}" width="80%">
//         <h2 class="titulo-producto">${producto.nombre}</h2>
//         <div>
//           <h4 class="precio-producto">$${producto.precio}</h4>
//         </div>
//         <button class="subtitulo-info-button" data-id="${producto.id}">Agregar</button>
//       </div>
//     `;

//     contenedorProductos.appendChild(productoElement);
//   });
// }

// // Función para agregar un producto al carrito
// function agregarProductoAlCarrito(id) {
//   const productoEnCarrito = carrito.find(item => item.id === id);
//   const productoEnStock = productosEnStock.find(producto => producto.id === id);

//   if (productoEnStock && productoEnStock.cantidad > 0) {
//     if (productoEnCarrito) {
//       productoEnCarrito.cantidad++;
//     } else {
//       carrito.push({ id, cantidad: 1 });
//     }

//     productoEnStock.cantidad--;
//     renderizarProductos();
//     actualizarCarrito();
//     guardarCarritoEnLocalStorage();
//     // console.log(camelia)
//   }
// }

// // Función para actualizar el contador del carrito
// function actualizarCarrito() {
//   const contadorCarrito = document.getElementById('contador-carrito');
//   contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
//   // console.log(camelia2)
// }

// // Función para guardar el carrito en el almacenamiento local
// function guardarCarritoEnLocalStorage() {
//   localStorage.setItem('carrito', JSON.stringify(carrito));
//   // console.log(camelia3)
// }


// // Evento DOMContentLoaded para cargar productos y configurar eventos de botones
// document.addEventListener('DOMContentLoaded', () => {
//   productosEnStock = cargarProductos();
//   renderizarProductos();
//   actualizarCarrito();

//   const botonesAgregar = document.querySelectorAll('.subtitulo-info-button');
//   botonesAgregar.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = btn.getAttribute('data-id');
//       agregarProductoAlCarrito(id);
//     });
//   });
// });

// const contactForm = document.querySelector(('#contact_form'));
// const userName = document.querySelector('#user_name');
// const userEmail = document.querySelector('#user_email');
// const message = document.querySelector('#message');

// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const body = {

//   }

//   sendEmail(body)

//   console.log(userName.value)
//   console.log(userEmail.value)
//   console.log(message.value)

// });

// const sendEmail = async (body) => {
//   const settings = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }
//   const response = await fetch('https://api.mailjs.com/api/v1.@/email/send', settings);
// }

const contenedorProductos = document.querySelector('.contenedor-productos');

function crearProductoCard(producto) {
  // Crear un elemento de tarjeta (card)
  const card = document.createElement('div');
  card.className = 'card';
  card.width = 250;

  // Crear imagen
  const imagen = document.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.width = 200;

  // Crear nombre
  const nombre = document.createElement('h2');
  nombre.textContent = producto.nombre;

  // Crear precio
  const precio = document.createElement('p');
  precio.textContent = `Precio: $${producto.precio}`;

  // Crear cantidad en stock
  const cantidad = document.createElement('p');
  cantidad.textContent = `En stock: ${producto.cantidad} unidades`;

  // Crear botón de compra
  const botonComprar = document.createElement('button');
  botonComprar.textContent = 'Comprar';
  botonComprar.className = 'boton-comprar boton-carrito';

  // Agregar elementos a la tarjeta (card)
  card.appendChild(imagen);
  card.appendChild(nombre);
  card.appendChild(precio);
  card.appendChild(cantidad);
  card.appendChild(botonComprar);

  return card;
}

function agregarProductosAlContenedor(productos) {
  productos.forEach(producto => {
    const productoCard = crearProductoCard(producto);
    contenedorProductos.appendChild(productoCard);
  });
}

// Llamar a la función para agregar productos al contenedor
agregarProductosAlContenedor(productos);
