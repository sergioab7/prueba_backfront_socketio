import Auth from "../helpers/Auth.helper.js";
import bcryptjs from "bcryptjs";

export const registro = async(req,res) => {
    const { email, password, usuario} = req.body;

    const passwordSalt = await bcryptjs.genSalt(12);
    const passwordEncrypted = await bcryptjs.hash(password, passwordSalt);

    const fecha = new Date();
    const user = new Auth(email, passwordEncrypted,usuario, fecha);
    const registro_usuario = await user.registro();

    return res.status(201).json({
        msg:'[+] Usuario registrado con éxito',
        registro_usuario
    })
}

export const login = async(req,res) => {

    try {
        const { email, password } = req.body;
        
        const userLogin = new Auth(email, password);
        const login = await userLogin.login();
        console.log("Ahora aqui:", login);
    
        if(login==="Email incorrecto"){
            return res.status(400).json({
                msg:'[-] Error en el email al loguearte.',
            })
        }

        if(login==="Password incorrecto"){
            return res.status(400).json({
                msg:'[-] Error en la password al loguearte.',
            })
        }
    
        return res.status(201).json({
            msg:'[+] Usuario logueado correctamente',
            login
        })
    } catch (error) {
        return res.status(500).json({
            msg:'[-] Internal Server Error',
            error
        })
    }

}