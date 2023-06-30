import { Schema, model } from "mongoose";

const rolesColeccion='roles'
const rolesEsquema=new Schema({
    codigo: Number,nombre:String, descripcion:String,

},{
    timestamps:true,
    collation:'roles'
})

export const rolesModelo = model(rolesColeccion, rolesEsquema)