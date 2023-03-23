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
                  },
                }
              ]
            }
    });
    carritoSchema.pre('find',function(){
      this.populate('producto.product');
    })
    carritoSchema.pre('findOne',function(){
      this.populate('producto.product');
    })

    export const carritoModelo= model(carritoCollections,carritoSchema);