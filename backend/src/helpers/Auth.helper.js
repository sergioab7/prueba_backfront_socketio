import { Usuario } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { mijwt } from "./crearJWT.js";

class Auth{
    constructor(email, password, usuario=null, fecha=null){
        this.email=email;
        this.password=password;
        this.usuario=usuario;
        this.fecha=fecha;
    }

    async registro(){
        const usuario = await new Usuario({
            usuario: this.usuario,
            email:this.email,
            password:this.password,
            fecha:this.fecha
        });

        const registroUser = await usuario.save();

        return {
            registroUser
        }
    }

    async login(){
        const existeUsuario = await Usuario.findOne({email:this.email});
        console.log(existeUsuario);

        if(!existeUsuario){
            return "Email incorrecto";
        }

        const validarPassword = await bcryptjs.compare(this.password, existeUsuario.password);

        if(!validarPassword){
            return "Password incorrecto";
        }

        
        const token = await mijwt(existeUsuario._id);
        console.log("Token:", token);
        return {
            usuario:existeUsuario.usuario,
            token
        };


    }
}


export default Auth;