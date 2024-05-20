import { Usuario } from "../models/User.js";
import { Sala } from "../models/Salas.js";

export const usuarios = async(req,res) => {

}


export const salas = async(req,res) => {
    const { nombreSala, usuario, mensaje, fecha } = req.body;

    const mensajeUsuario = {
        usuario,
        mensaje,
        fecha
    }

    const guardarMensajes = new Sala({
        nombre:nombreSala,
        mensajes:[mensajeUsuario]
    });

    try {
        await guardarMensajes.save();
        res.status(201).json({
            msg:'[+] Mensaje guardado correctamente',
            datos:guardarMensajes
        })
    } catch (error) {
        res.status(500).json({ 
            message: '[-] Error al enviar el mensaje', 
            error: error.message 
        });
    }
}

export const extraerSalaGeneral = async(req,res) => {
    try {
        const mensajesGeneral = await Sala.find({nombre:'general'})

        res.status(200).json({
            msg:'[+] Datos obtenidos correctamente',
            mensajesGeneral
        })
    } catch (error) {
        res.status(500).json({ 
            message: '[-] No se ha podido recuperar los mensajes', 
            error: error.message 
        });
    }
}

export const extraerSalaJuegos = async(req,res) => {
    try {
        const mensajesGeneral = await Sala.find({nombre:'juegos'})

        res.status(200).json({
            msg:'[+] Datos obtenidos correctamente',
            mensajesGeneral
        })
    } catch (error) {
        res.status(500).json({ 
            message: '[-] No se ha podido recuperar los mensajes', 
            error: error.message 
        });
    }
}

export const extraerSalaNegocios = async(req,res) => {
    try {
        const mensajesGeneral = await Sala.find({nombre:'negocios'})

        res.status(200).json({
            msg:'[+] Datos obtenidos correctamente',
            mensajesGeneral
        })
    } catch (error) {
        res.status(500).json({ 
            message: '[-] No se ha podido recuperar los mensajes', 
            error: error.message 
        });
    }
}