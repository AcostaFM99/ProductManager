import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

    const poroductsCollection='products';

    const productsSchema=new Schema({
        id: String,
        title:{
            type:String,
            unique:[true, `ya existe un producto con ese nombre`],
            require:true
        },
        description: {
            type:String,
            require:true
        },
        code: {
            type: String,
            require:true,
            unique:[true, `El codigo ya existe en la DB.`]
        },
        price: Number,
        status: Boolean,
        stock: String,
        thumbnail: String,
        category:String,
        fechaAlt:{
            type:Date,
            default: Date.now()
        }

    });
        productsSchema.plugin(mongoosePaginate);

    export const productsModelo =model(poroductsCollection,productsSchema);
