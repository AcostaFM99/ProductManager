import express from "express";
import { __dirname } from "../utils.js";
import productRouter from '../routes/products.router.js';
import carritoRouter from '../routes/carrito.router.js';
import Middleware from "../Middleware/Middleware.js";
import { engine } from 'express-handlebars';
import path from 'path';


const rutaviews= path.join(__dirname + '/app/views');
const rutapublic= path.join(__dirname + '/public');
const PORT = 8080;
const app = express();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', rutaviews);
app.get('/', (req, res) => {
  res.render('home');
});
app.use(express.static(rutapublic));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productRouter,Middleware.midd1);
app.use('/api/carts',carritoRouter);


app.use(Middleware.middErrores);
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

server.on("error", (error) => console.log(error));
