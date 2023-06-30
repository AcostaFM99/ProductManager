import passport from "passport";
import local from "passport-local"
import { creaHash, esClaveValida } from "../utils/utils.js";
import { usuarioModelo } from "../DAO/models/usuarios.models.js";

export const inicializaEstrategias = ()=>{

    passport.use('registro', new local.Strategy({usernameField:'email',passReqToCallback:true},async (req,username,password,done)=>{

        try {

            let {nombre, apellido,edad}= req.body;

            if(!username || !password) return done(null, false);
    
            let usuarioActual= await usuarioModelo.findOne({email:username}) 
    
            if(usuarioActual)return done(null, false);

            // parte para hacer admin al usuario de coderhouse
            // let contraseñaVerif = crypto.createHash('sha256','holaChau').update(contraseña).digest('base64')
            // let credenciales= email == 'adminCoder@coder.com' && contraseñaVerif==crypto.createHash('sha256','holaChau').update("adminCod3r123").digest('base64')?"admin":"usuario";

            let usuario = await usuarioModelo.create({
                nombre: nombre,
                apellido : apellido,
                email:username,
                contraseña:creaHash(contraseña),
                edad:edad,
                rol: credenciales
            })
            
            return done(null, usuario);


        } catch (error) {
           return done(error);
        }



    }))

    passport.use('login', new local.Strategy({usernameField:'email'},async (username,password,done)=>{

        try {
            if(!username || !password) return done(null, false);

            let usuario= await usuarioModelo.findOne({email:username});
            
            if(!usuario)return done(null, false);
    
            if(!esClaveValida(password, usuario)) return done(null, false);
    
            return done(null, usuario);
    
        } catch (error) {
           return done(error);
        }


    }));

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done)=>{
        let usuario = await usuarioModelo.findOne({_id:id});
        done(null, usuario);
    })




};