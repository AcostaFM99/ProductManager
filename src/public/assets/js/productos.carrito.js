const socket=io();

const botonesAgregar = document.querySelectorAll('.agregar-al-carrito');

let params = document.getElementById("params");
let categoria = document.getElementById("categoria");
let estado = document.getElementById("estado");
let sort = document.getElementById("sortSelect");
let limitPage = document.getElementById("limitPage");
let pageNum = document.getElementById("pageNum");
let cartSelect = document.getElementById("cartSelect");

