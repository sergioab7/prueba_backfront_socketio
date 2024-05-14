import { Schema, model} from "mongoose";

const UsuarioSchema = new Schema({
    usuario:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fecha:String,
    mensajes:[Object]
}, {
    versionKey:false
})

export const Usuario = model('Usuario', UsuarioSchema);