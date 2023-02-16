import express from 'express';
import ProductManager from './ProductManager.js';
import { __dirname } from './utils.js';
import path  from 'path';

const PORT=8080;
const app=express();
const rutaAbsoluta = path.join(__dirname);
console.log(rutaAbsoluta);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let pm= new ProductManager("../files/products.json");


app.get('/api/products', async (req,res)=>{
    let limit = req.query.limit;
    let products = await pm.getProduct();
    res.setHeader('Content-Type','application/json');
    res.status(200).json({products:products.slice(0,limit)});
});

app.get('/api/products/:pid',async (req,res)=>{
    let id = req.params.pid;
    let product = await pm.getProductById(id);
    res.setHeader('Content-Type','application/json');
    if(product){
        res.status(200),json({product});
    }else{
        res.status(400),json({error:"el producto no existe"});
    };
});


app.post('/api/products',async (req,res)=>{
    let product = req.body;
    res.setHeader('Content-Type','application/json');
    if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnails ){
        res.status(400).json({ error: "faltan campos por completar."});
    }else{
        product = await pm.addProducts(product);
        res.status(200).json({message: `Se agrego correctamtene el producto: `,product});
    };


});




const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));