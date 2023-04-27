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
import session from "express-session";
import mongoStore from 'connect-mongo'
import sessionRouter from "../routes/sessions.router.js";
import passport from "passport";
import { inicializaEstrategias } from "../config/passport.config.js";

const rutaviews= path.join(__dirname + '/app/views');
const rutapublic= path.join(__dirname + '/public');
const rutaFilesProdc = path.join(__dirname + '/files/products.json')

const PORT = 8080;
const app = express();

const pm = new ProductManager(rutaFilesProdc);

//configuracion de handlebars
app.engine('handlebars', engine({
  runtimeOptions:{
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
}));
app.set('view engine', 'handlebars');
app.set('views', rutaviews);
//configuracion de la carpeta publica
app.use(express.static(rutapublic));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret:'miPalabraSecreta',
    resave: true,
    saveUninitialized:true,
    store:mongoStore.create({
      mongoUrl:'mongodb+srv://coderhouse:coderhouse@cluster0.npycwhz.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce',
      ttl:60
    })
}));

inicializaEstrategias();
app.use(passport.initialize());
app.use(passport.session());


//****************rutas de views**********
app.use('/',viewsRouter);
//**************registro*********************
app.use('/api/sessions',sessionRouter);
///*************** monngose***************
app.use('/api/products',productsMg);
app.use('/api/carts',carritoMg);
//*************** filesSystem*************
app.use('/api/products',productRouter);
app.use('/api/carts',carritoRouter);



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
