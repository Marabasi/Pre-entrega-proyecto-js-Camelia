function loadPage(url){
  fetch(url)
    .then(response => { return response.json()})
    .then(data =>{

      console.log('fetchData', data);
      ProcessData(data); 
  
    });
}

function ProcessData(value){
  console.log('ProcessData...', value); 
  
  carrito = cargarCarritoDelLocalStorage();
  productosEnStock = value;
   renderizarProductos();
   actualizarCarrito(); 

}


//  Local storage
 function cargarCarritoDelLocalStorage() {
  const productos = []; 
  const productosGuardados = localStorage.getItem('carrito');
   if (productosGuardados) {
     return JSON.parse(productosGuardados);
   }
   return productos;
 }

//  let productosEnStock = cargarCarritoDelLocalStorage();
//  let carrito = [];

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
   const botonesAgregar = document.querySelectorAll('.subtitulo-info-button');
   botonesAgregar.forEach(btn => {
     btn.addEventListener('click', () => {
       const id = btn.getAttribute('data-id');
       agregarProductoAlCarrito(id);
     });
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
    //  renderizarProductos();
     actualizarCarrito();
     guardarCarritoEnLocalStorage();
     mostrarProductosEnCarrito();
   }
 }

 function actualizarCarrito() {
   const contadorCarrito = document.getElementById('contador-carrito');
   contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
  //  const carritoList = document.getElementById('carrito-list');

 }

 // Guardar el carrito en el local storage
 function guardarCarritoEnLocalStorage() {
   localStorage.setItem('carrito', JSON.stringify(carrito));
 }


 // Evento DOMContentLoaded
 document.addEventListener('DOMContentLoaded', () => {
   loadPage('/Datos/productos.json'); 
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
    const producto = productosEnStock.find(producto => producto.id === item.id);
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
  });

