import { Schema, model } from "mongoose";
import { paginate } from "mongoose-paginate-v2";

const usuarioColeccion = 'usuarios';
const usuariosSchema = new Schema({
    nombre:String,
    apellido:String,
    email:{type:String,unique:true},
    contraseña:String,
    dni:{type: String, unique:true},
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
        type: Schema.Types.ObjectId,
        ref:'roles'
    }

},
//configuraciones de Schema
{
    timestamps:true
});

usuariosSchema.plugin(paginate); // esta linmea me da error 

usuariosSchema.pre('find',function(){
    this.populate('rol')
})
usuariosSchema.pre('findOne',function(){
    this.populate('rol')
})

export const usuarioModelo= model(usuarioColeccion,usuariosSchema);