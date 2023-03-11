import {Schema, model} from "mongoose";

    const poroductsCollection='products';

    const productsSchema=new Schema({
        id: String,
        title: String,
        description: {
            type:String,
            unique:[true, `Ya existe un producto con ese nombre en la base de datos.`]
        },
        code: {
            type: String,
            unique:[true, `El codigo ya existe en la DB.`]
        },
        price: Number,
        status: Boolean,
        stock: String,
        thumbnail: String,
        fechaAlt:{
            type:Date,
            default: Date.now()
        }

    });

    export const productsModelo =model(poroductsCollection,productsSchema);
