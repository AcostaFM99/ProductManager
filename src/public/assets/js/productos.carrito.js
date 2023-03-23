const socket=io();

const botonesAgregar = document.querySelectorAll('.agregar-al-carrito');

botonesAgregar.forEach(function(boton) {
    boton.addEventListener('click', function() {

      const nombreProducto = this.dataset.producto;
      
      
      console.log(`Se ha agregado ${nombreProducto} al carrito`);
    });
  });