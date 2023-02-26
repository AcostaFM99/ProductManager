import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../Managers/ProductManager.js";

const router = Router();
const pm = new ProductManager(__dirname+"/files/products.json");

router.get('/',async(req, res)=>{
    let productos = await pm.getProduct();
    res.render('home',{productos});
})

router.get('/realtimeproducts', async(req, res)=>{
    res.render('realTimeProducts');
});

export default router;

