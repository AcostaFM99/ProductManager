import express from "express";
import { __dirname } from "../utils.js";
import productRouter from '../routes/products.router.js';
import carritoRouter from '../routes/carrito.router.js';
import viewsRouter from '../routes/views.router.js';
import Middleware from "../Middleware/Middleware.js";
import { engine } from 'express-handlebars';
import path from 'path';
import { Server } from "socket.io";
import ProductManager from "../Managers/ProductManager.js";


const rutaviews= path.join(__dirname + '/app/views');
const rutapublic= path.join(__dirname + '/public');
const rutaFilesProdc = path.join(__dirname + '/files/products.json')

const PORT = 8080;
const app = express();
const pm = new ProductManager(rutaFilesProdc);


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', rutaviews);

app.use(express.static(rutapublic));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',viewsRouter);
app.use('/api/products',productRouter,Middleware.midd1);
app.use('/api/carts',carritoRouter);

app.use(Middleware.middErrores);



const serverHttp = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

const serverSockets = new Server(serverHttp);

serverSockets.on('connection',async (socket)=>{
  console.log(`Se han conectado socket id: ${socket.id}`);

    let products = await pm.getProduct();
    socket.emit('products', products);

    socket.on("deleteProduct", async (id) => {
      let response = await pm.deleteProductSocket(id);
      socket.emit("deleteProductRes", response);
    });
  
    socket.on("addProduct", async (product) => {
      let response = await pm.addProductSocket(product);
      socket.emit("addProductRes", response);
    });

    
});

serverHttp.on("error", (error) => console.log(error));
