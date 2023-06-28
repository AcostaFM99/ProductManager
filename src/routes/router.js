import { Router } from "express";
import jwt from "jsonwebtoken";

export class Mirouter{
    constructor(){
        this.router=Router();
        this.init()
    }
    
    init(){}

    getRouter(){
      return this.router;
    }

    get(path, permisos, ...funciones){
        this.router.get(path,this.misRespuestas,this.handlePolices(permisos),this.applyCallbacks(funciones) )
    }   

    post(path,permisos, ...funciones){
        this.router.post(path,this.misRespuestas,this.handlePolices(permisos),this.applyCallbacks(funciones) )
    } 

    delete(path,permisos, ...funciones){
        this.router.delete(path,this.misRespuestas,this.handlePolices(permisos),this.applyCallbacks(funciones) )
    } 
    
    put(path,permisos, ...funciones){
        this.router.put(path,this.misRespuestas,this.handlePolices(permisos),this.applyCallbacks(funciones) )
    } 

    applyCallbacks(callbacks){
       
        return callbacks.map(callback => async (...params)=>{
            try {
                await callback.apply(this,params)
            } catch (error) {
                params[1].status(500).send('Error interno del servidor')
            }
            
        })
    }

        misRespuestas(req,res,next){
            res.success=(respuesta)=>res.status(200).send({status:'Ok', respuesta});
            res.success2=(respuesta, datos)=>res.status(200).send({status:'Ok', respuesta, datos});
            res.errorCliente=(error)=>res.status(400).send({status:'error', error});
            res.errorAutenticacion=(error)=>res.status(401).send({status:'Error de autenticacion', error});
            res.errorAutorizacion=(error)=>res.status(403).send({status:'Error de autorizacion', error});

            next();
        }

        handlePolices(arrayPermisos){
            return (req,res,next)=>{
                if(arrayPermisos.includes('PUBLIC'))return next();
            }
        }
        
    


}

//req.sesions para la alternativa a las coockies