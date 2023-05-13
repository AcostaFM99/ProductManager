import { Router } from "express";
import Middleware from "../Middleware/Middleware.js";
import { usuarioModelo } from "../DAO/models/usuarios.models.js";
import ProductManagerMg from "../DAO/ManagersMg/ProductManagerMg.js";
import CarritoManagerMg from "../DAO/ManagersMg/CarritoManagerMg.js";

const router = Router();
const pm = new ProductManagerMg();
const cm = new CarritoManagerMg();

router.get('/',async(req, res)=>{})

router.get('/realtimeproducts', async(req, res)=>{
    res.render('realTimeProducts');
});

router.get('/api/products',Middleware.auth,async(req,res)=>{

    let email=req.session.usuario.email;
    let nombre= req.session.usuario.nombre;  
    let apellido = req.session.usuario.apellido;      
    let producto = await usuarioModelo.findOne({email:email});
    let rol= producto.rol;  
    let edad = req.session.usuario.edad;
    
    let products = await pm.getProducts(req);
    let carts = await cm.getCarrito();
    res.status(200).render('home',{
        email,nombre,apellido,rol,edad,products,carts
    });
});

router.get('/chat', async(req,res)=>{
    let style='chat.css'
    res.status(200).render('chat',{style});
});

router.get('/registro',Middleware.auth2,async(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render('registro');
});

router.get('/login',Middleware.auth2, async(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render('login');
})


export default router;

