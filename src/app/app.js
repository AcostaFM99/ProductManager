import express from "express";
import { __dirname } from "../utils.js";
import productRouter from '../routes/products.router.js';
import carritoRouter from '../routes/carrito.router.js';
import productsMg from '../routes/products.mg.router.js'
import carritoMg from '../routes/carrito.mg.router.js'
import viewsRouter from '../routes/views.router.js';
import Middleware from "../Middleware/Middleware.js";
import { engine } from 'express-handlebars';
import path from 'path';
import { Server } from "socket.io";
import ProductManager from "../DAO/ManagersFs/ProductManager.js";
import mongoose from 'mongoose';
import { messagesModelo } from "../DAO/models/messages.models.js";
import { carritoModelo } from "../DAO/models/carritos.models.js";



const rutaviews= path.join(__dirname + '/app/views');
const rutapublic= path.join(__dirname + '/public');
const rutaFilesProdc = path.join(__dirname + '/files/products.json')

const PORT = 8080;
const app = express();

const pm = new ProductManager(rutaFilesProdc);


app.engine('handlebars', engine({
  runtimeOptions:{
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
}));
app.set('view engine', 'handlebars');
app.set('views', rutaviews);

app.use(express.static(rutapublic));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//****************rutas de views**********
app.use('/',viewsRouter);
///*************** monngose***************
app.use('/api/products',productsMg,Middleware.midd1);
app.use('/api/carts',carritoMg);
//*************** filesSystem*************
app.use('/api/products',productRouter,Middleware.midd1);
app.use('/api/carts',carritoRouter);






app.use(Middleware.middErrores);


const serverHttp = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

const serverSockets = new Server(serverHttp);

serverSockets.on('connection',async (socket)=>{
  console.log(`Se han conectado socket id: ${socket.id}`);

    //************** Chat ********************
      socket.on('mensaje',async(mensaje)=>{
        await messagesModelo.create({user:mensaje.emisor, message:mensaje.mensaje});
        serverSockets.emit('nuevoMensaje',mensaje);
      })  

    //********Manager Products FileSystyem********
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

const conectar= async()=>{
  try {
    await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.npycwhz.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce');
    console.log('Conexion a DB establecida');
  } catch (error) {
    console.log(`Error de conexion al servidor BD: ${error}`);
    
  }
}

conectar();

serverHttp.on("error", (error) => console.log(error));
