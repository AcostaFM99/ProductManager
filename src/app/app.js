import express from "express";
import { __dirname } from "../utils/utils.js";
import {ProductsRouter} from "../routes/products.router.js"
import {CarritoRouter} from '../routes/carrito.router.js';
import { ProductsMgRouter } from '../routes/products.mg.router.js'
import {CarritoMgRouter} from '../routes/carrito.mg.router.js'
import {ViewsRouter} from '../routes/views.router.js';
import Middleware from "../Middleware/Middleware.js";
import { engine } from 'express-handlebars';
import path from 'path';
import { Server } from "socket.io";
import ProductManager from "../DAO/ManagersFs/ProductManager.js";
import mongoose from 'mongoose';
import { messagesModelo } from "../DAO/models/messages.models.js";
import session from "express-session";
import mongoStore from 'connect-mongo'
import { SessionRouter } from "../routes/sessions.router.js";
import passport from "passport";
import { inicializaEstrategias } from "../config/passport.config.js";
import cookieParser from "cookie-parser";
import ProductManagerMg from "../DAO/ManagersMg/ProductManagerMg.js";
import { config } from "../config/config.dotenv.js";


const rutaviews= path.join(__dirname + '/app/views');
const rutapublic= path.join(__dirname + '/public');
const rutaFilesProdc = path.join(__dirname + '/files/products.json')

const PORT = config.PORT;
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
//****************** cookie**********************

app.use(cookieParser());

//**************configuracion de express**************
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret:'miPalabraSecreta',
    resave: true,
    saveUninitialized:true,
    store:mongoStore.create({
      mongoUrl:config.MONGOURL,
      ttl:60
    })
}));
//mongodb+srv://coderhouse:coderhouse@cluster0.npycwhz.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce

//****************Routers**************************
const sessionRouter = new SessionRouter();
const productRouter = new ProductsRouter();
const carritoRouter = new CarritoRouter();
const carritoMgRouter = new CarritoMgRouter();
const productsMgRouter = new ProductsMgRouter();
const viewsRouter = new ViewsRouter();

//**************passport*********************
inicializaEstrategias();
app.use(passport.initialize());
app.use(passport.session());



//Rutas a los endpoints con sus Routers
//****************rutas de views**********
app.use('/',viewsRouter.getRouter());
//**************registro y login Sessions*********************
app.use('/api/sessions',sessionRouter.getRouter());
///*************** monngose***************
app.use('/api/products',productsMgRouter.getRouter());
app.use('/api/carts',carritoMgRouter.getRouter);
//*************** filesSystem*************
app.use('/api/products',productRouter.getRouter());
app.use('/api/carts',carritoRouter.getRouter());





//Se pone a escuchar el servidor
const serverHttp = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

//configuracion  de server Socket
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

//coneccion de mongo con ruta segura
const conectar= async()=>{
  try {
    await mongoose.connect(config.MONGOURL);
    console.log('Conexion a DB establecida');
  } catch (error) {
    console.log(`Error de conexion al servidor BD: ${error}`);
    
  }
}

conectar();

serverHttp.on("error", (error) => console.log(error));
