import {Schema, model} from "mongoose";

    const carritoCollections ="carritos";

    const carritoSchema =new Schema({
            producto:{
              type:[
                {
                  product:{
                    type:Schema.Types.ObjectId,
                    ref:'products'
                  },
                  quantity:{
                    type: Number,
                    default: 0,
                  },
                }
              ]
            }
    });


    export const carritoModelo= model(carritoCollections,carritoSchema);