const express=require ('express')
import ProductManager from './ProductManager.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));



let t = new ProductManager("../file/products.json");


app.get('/products', async (req, res)=>{
    let limit = req.query.limit;
    let product = await t.getProduct();
    res.send({  product: product.slice(0, limit)});
});

app.get('/products/;pid', async (req, res)=>{
    let id = parseInt(req.params.pid);
    let product = await t.getProductById(id);
    if(product){
        res.send(product);
    }else{
        res.send('El producto es inexistente')
    }
});


app.listen(port,()=>{
    console.log(`Escuchando por el puerto ${port}`);
})