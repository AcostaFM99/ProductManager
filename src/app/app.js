import express from "express";
import { __dirname } from "../utils.js";
const PORT = 8080;
const app = express();
import productRouter from '../routes/products.router.js';
import carritoRouter from '../routes/carrito.router.js';
import Middleware from "../Middleware/Middleware.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productRouter);
app.use('/api/carts',carritoRouter);

app.use(Middleware.middErrores);
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

server.on("error", (error) => console.log(error));
