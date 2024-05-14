import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


export const verificarJWT = async(req,res,next) => {
    try {
        const token = req.header('authorization')
        console.log(token);
        if(!token){
            return res.status(400).json({
                status:'Error',
                msg:'[-] No existe el token'
            })
        }
    
        jwt.verify(token, process.env.JWT_TOKEN, (err,decode) => {
            if(err){
                return res.status(400).json({
                    status:"Error",
                    message:"[-] El token ha expirado o es inválido."
                })
            }
            req.user = decode.id;
        })
        
    } catch (error) {
        res.status(400).json({
            msg:'[-] Acceso denegado, token expirado o incorrecto'
        })
    }

    next();
}