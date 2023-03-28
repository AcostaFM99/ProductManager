import { Schema, model } from "mongoose";


const usuarioColeccion = 'usuarios';
const usuariosSchema = new Schema({
    nombre:String,
    apellido:String,
    email:{
        type:String,
        unique:true
    },
    contraseña:String,
    edad:Number,
    rol:String

});

export const usuarioModelo= model(usuarioColeccion,usuariosSchema);