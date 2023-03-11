import {Schema, model} from "mongoose";

    const carritoCollections ="carrito";

    const carritoSchema =new Schema({
        id: String,
        prodruct:[
            {
                prodruct: String,
                quantity: Number
            }
        ]

    });
    

    export const carritoModelo= model(carritoCollections,carritoSchema);