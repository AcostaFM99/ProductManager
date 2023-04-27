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
    cart:{
        type:[
            {
                id:{
                    type:Schema.Types.ObjectId,
                    ref:'carritos'
                }
            }
            
        ]
    }
    ,
    rol:{
        type: String,
        default: "user"
    }

});

export const usuarioModelo= model(usuarioColeccion,usuariosSchema);