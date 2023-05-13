import { creaHash } from "../../utils.js";
import { usuarioModelo } from "../models/usuarios.models.js";

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

        if(!email || !contraseña) return res.sendStatus(400)

        let usuario= await usuarioModelo.find({email:email , contraseña:creaHash(contraseña)});

        if(!usuario) return res.sendStatus(401)

        req.session.usuario={
            nombre: usuario.nombre, 
            apellido:usuario.apellido, 
            email, 
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