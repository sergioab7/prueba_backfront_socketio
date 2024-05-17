import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';
import ScrollToBottom from "react-scroll-to-bottom";

export const SalaGeneral = ({usuario, socket}) => {

    const URL_DATOSGENERAL = 'http://localhost:4001/api/dashboard/sala-general'
    const URL_ENVIAR_DATOS = 'http://localhost:4001/api/dashboard/salas'

    const [mensaje, setMensaje] = useState('');
    const [recibidoMensaje, setRecibidoMensaje] = useState([]);
    const [usuarioConectado, setUsuarioConectado] = useState(false);
    const [mensajesBBDD, setMensajesBBDD] = useState([]);
    const [enviadoM, setEnviadoM] = useState(false);

    const navigate = useNavigate();
    //const location = useLocation(); 

    const usuarioExisteEnSala = () => {
        const usuario = localStorage.getItem("usuario");
        const sala = localStorage.getItem("sala");
        if(usuario && sala){
            setUsuarioConectado(true);
        }else{
            setUsuarioConectado(false);
        }
    }

    const volverDashboard = () => {
        //console.log(location.pathname);
        navigate("/dashboard");
    }

    const enviarMensaje = async() => {
        const enviarDatos = {
            user:localStorage.getItem("usuario"),
            room:localStorage.getItem("sala"),
            message:mensaje,
            time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        }

        const enviarDataFetch = {
            nombreSala:localStorage.getItem("sala"),
            usuario:localStorage.getItem("usuario"),
            mensaje:mensaje,
            fecha:new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes()
        }

        fetch(URL_ENVIAR_DATOS, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            },
            body:JSON.stringify(enviarDataFetch)
        }).then(res => res.json())
            .then(datos => {
            console.log("datos enviados correctamente");
            console.log(datos);
            });

        //Siguiente
        await socket.emit('send_message_to_room', enviarDatos);
        setRecibidoMensaje((list) => [...list, enviarDatos]);

        setMensaje("");
    }

    const recuperarMensajes = () => {
        fetch(URL_DATOSGENERAL, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        }).then(res => res.json())
          .then(datos => {
            datos.mensajesGeneral.forEach((mensaje) => {
                console.log(mensaje.mensajes[0].mensaje);
            })
            setMensajesBBDD(datos.mensajesGeneral);

          })
    }

    useEffect(()=> {
        recuperarMensajes();
    },[]); // AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

    useEffect(() => {
        setEnviadoM(!enviadoM);

        socket.on('received_message', (data) => {
            console.log("HOLA PASO POR AQUI");
            console.log("mensaje recibido: " + data.message);
            setRecibidoMensaje((list) => [...list, data]);
        });
        
        const t = usuarioExisteEnSala();
        console.log(t);
        return () => {
            socket.off('received_message');
        };
    },[socket]);


  return (
    <div>
        <header className="cabecera">
            <div className="cabecera__back" onClick={() => volverDashboard()}>
                <ChevronLeft size={"60px"} /> Volver
            </div>
            <h2>General</h2>
            <p>Usuario: {usuario}</p>
        </header>
        <main className="chat">
            <div className="generalChat">
                <div className="vistaChat">
                    <ScrollToBottom>
                    {mensajesBBDD.map((message,i) => (
                        <>
                        <div className="mensajesChat" id={usuario === message.mensajes[0].usuario ? "you" : "other"}>
                            <span key={i} className="usuarioChat">{message.mensajes[0].usuario}:</span> <span className="mensajeUsuario">{message.mensajes[0].mensaje}</span>
                            <div className="usuarioChat">
                                <em>{message.mensajes[0].fecha}h</em>
                            </div>
                        </div>
                        </>
                    ))}
                    </ScrollToBottom>
                </div>
                <div className="usuariosConectados">
                    <p className="usuariosOnP">Usuarios conectados</p>
                    {usuarioConectado && (
                        <p>{usuario}</p>
                    )}
                </div>
            </div>
            <div className="textoChat">
                <input type="text" value={mensaje} onKeyDown={(event) => {
                    event.key==="Enter" && enviarMensaje();
                }}
                onChange={e => {
                    setMensaje(e.target.value)
                } }/>
                <button onClick={enviarMensaje}><Send /></button>
            </div>
        </main>
    </div>
  )
}
