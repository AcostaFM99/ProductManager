import { creaHash } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import { usuarioModelo } from "./models/usuarios.models.js";
import ProductManagerMg from "../DAO/ManagersMg/ProductManagerMg.js";
import CarritoManagerMg from "../DAO/ManagersMg/CarritoManagerMg.js";


const pm = new ProductManagerMg();
const cm = new CarritoManagerMg();



export default class Login{


    async registro(req,res){        
        let {nombre, apellido, email, edad, contraseña} = req.body;

        if(!email || !contraseña)return res.sendStatus(400);

        let usuariosActual = await usuarioModelo.findOne({email:email});
        
        if(usuariosActual){
            return res.sendStatus(400);
        }
        
        let rol  = "usuario"
        let usuarioAgregado = await usuarioModelo.create({rol,nombre, apellido, email, contraseña:creaHash(contraseña), edad});

        res.redirect('/login');
    }

    async Login(req,res){

        
        let {email, contraseña}= req.body;

        if(!email || !contraseña) return res.errorCliente('faltan datos')

        let usuario= await usuarioModelo.find({email:email , contraseña:creaHash(contraseña)});

        if(!usuario) return res.sendStatus(401)


        req.session.usuario={
            nombre: usuario.nombre, 
            apellido:usuario.apellido, 
            email, 
            edad:usuario.edad
        }

        let usuariojwt= req.session.usuario
        let token = jwt.sign({usuariojwt},'miPalabraSecreta')
        req.session.token = token ;
        
        return res.redirect('/api/products');
    }

    async logout(req,res){
        req.session.destroy((error)=>{
            if(error){
                return res.sendStatus(500);
            }else{
              res.redirect('/login');
            }
          });
    }


    async RenderUser(req,res){
        try {
            let email=req.session.usuario.email;
            let cliente = await usuarioModelo.findOne({email:email});
            let nombre= cliente.nombre;  
            let apellido = cliente.apellido;      
            let rol= cliente.rol;  
            let edad = cliente.edad;
            
            let products = await pm.getProducts(req);
            let carts = await cm.getCarrito();
    
            res.status(200).render('home',{email,nombre,apellido,rol,edad,products,carts });
        } catch (error) {
            res.status(400).redirect('/login');
        }

    }





}