'use strict';


const productos = [
  {
      id: 1,
      nombre: 'Morixe',
      precio: 270,
      cantidad:1,
      img: './productos/Morixe.jpg',
      categoria: 'venezolano'
      
  },
  {
      id: 2,
      nombre: 'Tostones',
      precio: 180,
      cantidad:1,
      img: './productos/toston.jpg',
      categoria: 'venezolano'
  },
  {
      id: 3,
      nombre: 'Harina Pan',
      precio: 270,
      cantidad:1,
      img: './productos/harinapann.jpg',
      categoria: 'venezolano'
  },
  {
      id: 4,
      nombre: 'Rekolita',
      precio: 100,
      cantidad:1,
      img: './productos/rekolita1.png',
      categoria: 'Bebidas'
    
},
{
      id: 5,
      nombre: 'Bon-Bon-Bum',
      precio: 70,
      cantidad:1,
      img: './productos/bonbon.jpg',
      categoria: 'venezolano'
},
  {
      id: 7,
      nombre: 'Malta',
      precio: 180,
      cantidad:1,
      img: './productos/malta58.webp',
      categoria: 'venezolano',
  }

];

let carrito = [];
const moneda = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMtotalProductos = document.querySelector('#total-productos');
const mostrar = document.querySelector('#boton-vaciar');
const btn =document.querySelector('#boton-vaciar').style.visibility = "hidden";

function renderizarProductos() {
  productos.forEach((info) => {
    
      const miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-sm-4');
      
      const miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
    
      const miNodoTitle = document.createElement('h4');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info.nombre;

      const miNodoCategoria = document.createElement('p');
      miNodoCategoria.classList.add('card-subtitle');
      miNodoCategoria.textContent =`${info.categoria}`;
    
    
      const miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', info.img);

      const miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-text');
      miNodoPrecio.textContent = `${moneda}${info.precio}`;
      
      const miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-primary');
      miNodoBoton.textContent = 'AÑADIR AL CARRITO';
      miNodoBoton.setAttribute('marcador', info.id);
      miNodoBoton.addEventListener('click', añadirProductoAlCarrito);
      miNodoBoton.addEventListener('click', mostrarBoton);
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoCategoria)
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
     
      
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
  });

}
function añadirProductoAlCarrito(evento) {
  carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();
    alert("¡El producto se agrego con exito!");

}

function renderizarCarrito() {
  DOMcarrito.textContent = '';
  const carritoSinDuplicados = [...new Set(carrito)];
  carritoSinDuplicados.forEach((item) => {
      const miItem = productos.filter((itemproductos) => {
          return itemproductos.id === parseInt(item);
      });  
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          return itemId === item ? total += 1 : total;
          
          
      }, 0);
      
      const miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${moneda}`;
      
    
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      miBoton.textContent = 'X';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item;
      miBoton.addEventListener('click', borrarItemCarrito);
      miBoton.addEventListener('click', ocultar);
      
    
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
  });
  
  DOMtotal.textContent = calcularTotal();
  DOMtotalProductos.textContent = calcularTotalproductos();
  
}
function borrarItemCarrito(evento) {
  const id = evento.target.dataset.item;
  carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
  });

  renderizarCarrito();
}
function calcularTotal() {
  return carrito.reduce((total, item) => {
      const miItem = productos.filter((itemproductos) => {
          return itemproductos.id === parseInt(item);
      });
    
      return total + miItem[0].precio;
  }, 0).toFixed(2);
}

function calcularTotalproductos () {
  return carrito.reduce((total, cantidad) => {
      const miItem = productos.filter((itemproductos) => {
      
          return itemproductos.id === parseInt(cantidad);
      });
     
    
      return total + miItem[0].cantidad;
      
  }, 0).toFixed(2);
  
}

function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
  alert("¡Acaba de vaciar el carrito!");
  btn= document.querySelector('#boton-vaciar').style.visibility = "hidden";
}

function mostrarBoton(){
  btn= document.querySelector('#boton-vaciar').style.visibility = "visible";
}
function ocultar() {
  if (DOMtotalProductos.textContent==0){
    btn= document.querySelector('#boton-vaciar').style.visibility = "hidden";
  }
}
function alerta(){
  swall
}
mostrar.addEventListener('click', vaciarCarrito);
renderizarProductos();
renderizarCarrito();

