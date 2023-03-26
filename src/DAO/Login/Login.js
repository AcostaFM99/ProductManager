import { Session } from "express-session";
import { usuarioModelo } from "../models/usuarios.models.js";
import crypto from 'crypto';


export default class Login{


    async registro(req,res){

        let {nombre, apellido, email, contraseña,edad}= req.body;

        if(!email || !contraseña) return res.sendStatus(404);

        let usuarioActual= await usuarioModelo.findOne({email:email}) 

        if(usuarioActual)return res.sendStatus(400);
        let contraseñaVerif = crypto.createHash('sha256','holaChau').update(contraseña).digest('base64')
        let credenciales=email == 'adminCoder@coder.com' && contraseñaVerif==crypto.createHash('sha256','holaChau').update("adminCod3r123").digest('base64')?"admin":"usuario";

        usuarioModelo.create({
            nombre,
            apellido,
            email,
            contraseña:crypto.createHash('sha256','holaChau').update(contraseña).digest('base64'),
            edad,
            rol: credenciales
        })

        res.redirect('/login');
        
                
    }

    async Login(req,res){
        let {email, contraseña}=req.body;

        if(!email || !contraseña) return res.redirect('/login');

        let usuario= await usuarioModelo.findOne({email:email,contraseña: crypto.createHash('sha256','holaChau').update(contraseña).digest('base64')});

        if(!usuario)return res.redirect('/login');

        req.session.usuario={
            nombre:usuario.nombre,
            apellido:usuario.apellido,
            email:usuario.email,
            edad:usuario.edad
        }

        res.redirect('/api/products');
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








}