import {Schema, model} from 'mongoose';

const messagesCollection = 'messages';


const messagesSchema =new Schema({

    user:{
        type:String,
        required:true,
    },
    message: {
        type: String,
        require:true
    }
});


export const messagesModelo=model(messagesCollection, messagesSchema);