import { model, Schema } from "mongoose";

const SalasSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    mensajes:[Object]
})

export const Sala = model('Sala', SalasSchema);