import {Schema, model} from "mongoose";

    const carritoCollections ="carritos";

    const carritoItemSchema =new Schema({
            producto:[{
              type:[
                {
                  product:{
                    type:Schema.Types.ObjectId,
                    ref:'products'
                  }
                  
                }
              
              ],
              quantity: {
                type: Number,
                default: 1,
              }
            }]
    });


    const carritoSchema = new Schema({
      productos:[carritoItemSchema]
    });
    
 
  //****************************************************  

  //   const carritoItemSchema =new Schema({
    
  //     productId: {
  //         type: String,
  //         required: false,
  //         unique: false,
  //       },
  //       quantity: {
  //         type: Number,
  //         default: 1,
  //       },
      
  // });

  // const carritoSchema = new Schema({
  //     products:[carritoItemSchema]
  // })
  

//***************************************************************

    export const carritoModelo= model(carritoCollections,carritoSchema);