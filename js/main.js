// // Array de productos
// const productos = [
//   {
//     id: 'Aceite',
//     nombre: 'Aceites',
//     imagen: './Img/Aceites-esenciales.jpg',
//     precio: 150,
//     cantidad: 10
//   },
//   {
//     id: 'Velas',
//     nombre: 'Velas',
//     imagen: './Img/Velas-de-miel.jpg',
//     precio: 50,
//     cantidad: 5
//   },
//   {
//     id: 'Adornos',
//     nombre: 'Adornos',
//     imagen: './Img/Elefante.jpg',
//     precio: 350,
//     cantidad: 3
//   },
//   {
//     id: 'Hornitos',
//     nombre: 'Hornitos',
//     imagen: './Img/Hornitos.jpg',
//     precio: 300,
//     cantidad: 7
//   },
//   {
//     id: 'Inciensos',
//     nombre: 'Inciensos',
//     imagen: './Img/Inciensos.jpg',
//     precio: 150,
//     cantidad: 8
//   }
// ];


const productos = [
  {
    id: 'Aceite',
    nombre: 'Aceites',
    imagen: './Img/Aceites-esenciales.jpg',
    precio: 150,
    cantidad: 10
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


// Asincronias y promesas
async function agregarProductoAlCarrito(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productoEnStock = productos.find(producto => producto.id === id);

      if (productoEnStock && productoEnStock.cantidad > 0) {
        const { id, nombre, precio } = productoEnStock;
        const productoEnCarrito = carrito.find(item => item.id === id);

        if (productoEnCarrito) {
          productoEnCarrito.cantidad++;
        } else {
          carrito.push({ id, nombre, precio, cantidad: 1 });
        }

        productoEnStock.cantidad--;
        renderizarProductos();
        actualizarCarrito();
        guardarCarritoEnLocalStorage();

        resolve(); 
      } else {
        reject("Producto no disponible");
      }
    }, 1000); 
  });
}


//  Local storage
 function cargarProductos() {
   const productosGuardados = localStorage.getItem('productos');
   if (productosGuardados) {
     return JSON.parse(productosGuardados);
   }
   return productos;
 }

 let productosEnStock = cargarProductos();
 const carrito = [];

// Renderizar productos
 function renderizarProductos() {
   const contenedorProductos = document.querySelector('.contenedor-productos');
   contenedorProductos.innerHTML = '';

   productosEnStock.forEach(producto => {
     const productoElement = document.createElement('div');
     productoElement.classList.add('producto');
     productoElement.innerHTML = `
       <div class="cajita">
         <img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}" title="${producto.nombre}" width="80%">
         <h2 class="titulo-producto">${producto.nombre}</h2>
         <div>
           <h4 class="precio-producto">$${producto.precio}</h4>
         </div>
         <button class="subtitulo-info-button" data-id="${producto.id}">Agregar</button>
       </div>
     `;

     contenedorProductos.appendChild(productoElement);
   });
 }

 // Agregar un producto al carrito
 function agregarProductoAlCarrito(id) {
   const productoEnCarrito = carrito.find(item => item.id === id);
   const productoEnStock = productosEnStock.find(producto => producto.id === id);

   if (productoEnStock && productoEnStock.cantidad > 0) {
     if (productoEnCarrito) {
       productoEnCarrito.cantidad++;
     } else {
       carrito.push({ id, cantidad: 1 });
     }

     productoEnStock.cantidad--;
     renderizarProductos();
     actualizarCarrito();
     guardarCarritoEnLocalStorage();
     console.log('camelia');
   }
 }

 function actualizarCarrito() {
   const contadorCarrito = document.getElementById('contador-carrito');
   contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
   console.log('camelia2');
 }

 // Guardar el carrito en el local storage
 function guardarCarritoEnLocalStorage() {
   localStorage.setItem('carrito', JSON.stringify(carrito));
   console.log('camelia3');
 }


 // Evento DOMContentLoaded
 document.addEventListener('DOMContentLoaded', () => {
   productosEnStock = cargarProductos();
   renderizarProductos();
   actualizarCarrito();

   const botonesAgregar = document.querySelectorAll('.subtitulo-info-button');
   botonesAgregar.forEach(btn => {
     btn.addEventListener('click', () => {
       const id = btn.getAttribute('data-id');
       agregarProductoAlCarrito(id);
     });
   });
 });

 // Modal
const modal = document.getElementById('carrito-modal');
const mostrarModalButton = document.getElementById('mostrar-modal-button');

mostrarModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
  mostrarProductosEnCarrito();
});

const close = document.querySelector('.close');
close.addEventListener('click', () => {
  modal.style.display = 'none';
});

function mostrarProductosEnCarrito() {
  const carritoList = document.getElementById('carrito-list');
  carritoList.innerHTML = '';

  carrito.forEach(item => {
    const producto = productos.find(producto => producto.id === item.id);
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - Cantidad: ${item.cantidad}`;
    carritoList.appendChild(li);
  });
}

//  Funcion de fetch y api para enviar mensajes a mi email
  const contactForm = document.querySelector(('#contact_form'));
  const userName = document.querySelector('#user_name');
  const userEmail = document.querySelector('#user_email');
  const message = document.querySelector('#message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const body = { 
      service_id: 'service_xk6aqtu',
      template_id: 'template_djvfgqe',
      user_id: 'ALJZKkU0xWKRf8mli',
      template_params: {
        'to_name': userName.value,
        'from_name': userEmail.value,
        'message': message.value,
      }
    }

  //   sendEmail(body)
  //   .then(response => console.log(response))
  //   .catch(error => {
  //     console.log(error);
  //   })
  // });

  sendEmail(body)
    .then(data => {
      console.log(data); 
      alert('Email enviado con éxito'); 
    })
    .catch(error => {
      console.error(error); 
      alert('Error al enviar el correo'); 
    });
});

  const sendEmail = async (body) => {
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', settings);
    const data = await response.json();

    return data;
  }

  const btn = document.querySelector('#btn-toast');

  btn.addEventListener('click', () => {
    Toastify({
      text: 'Hazme tu consulta en el formulario al final de la página',
      duration: 4000
    }).showToast();
  })


//  SEGUNDO INTENTO
// const contenedorProductos = document.querySelector('.contenedor-productos');

// function crearProductoCard(producto) {
//   // Elemento de tarjeta (card)
//   const card = document.createElement('div');
//   card.className = 'card';
//   // imagen.width = 200;
// card.width = 250;

//   // Crear imagen
//   const imagen = document.createElement('img');
//   imagen.src = producto.imagen;
//   imagen.alt = producto.nombre;
//   imagen.width = 200;

//   // Nombre
//   const nombre = document.createElement('h2');
//   nombre.textContent = producto.nombre;

//   // Precio
//   const precio = document.createElement('p');
//   precio.textContent = `Precio: $${producto.precio}`;

//   // Cantidad en stock
//   const cantidad = document.createElement('p');
//   cantidad.textContent = `En stock: ${producto.cantidad} unidades`;

//   // Crear botón de compra
//   const botonComprar = document.createElement('button');
//   botonComprar.textContent = 'Comprar';
//   botonComprar.className = 'boton-comprar boton-carrito';

//   // Agregar elementos a la tarjeta (card)
//   card.appendChild(imagen);
//   card.appendChild(nombre);
//   card.appendChild(precio);
//   card.appendChild(cantidad);
//   card.appendChild(botonComprar);

//   return card;
// }

// function agregarProductosAlContenedor(productos) {
//   productos.forEach(producto => {
//     const productoCard = crearProductoCard(producto);
//     contenedorProductos.appendChild(productoCard);
//   });
// }

// // Llamar a la función para agregar productos al contenedor
// agregarProductosAlContenedor(productos);
