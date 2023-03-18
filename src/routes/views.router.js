import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../DAO/ManagersFs/ProductManager.js";
import { productsModelo } from "../DAO/models/products.models.js";

const router = Router();
const pm = new ProductManager(__dirname+"/files/products.json");

router.get('/',async(req, res)=>{})

router.get('/realtimeproducts', async(req, res)=>{
    res.render('realTimeProducts');
});

router.get('/chat', async(req,res)=>{
    let style='chat.css'
    res.render('chat',{style});
})

export default router;

