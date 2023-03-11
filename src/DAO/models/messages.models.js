import {Schema, model} from 'mongoose';

const messagesCollection = 'messages';


const messagesSchema =new Schema({

    user:{
        type:String,
        required:true,
        unique:[true, 'El email ya esta registrado en la base de datos']
    },
    message: String
});


export const messagesModelo=model(messagesCollection, messagesSchema);