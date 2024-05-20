import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';
import ScrollToBottom from "react-scroll-to-bottom";

export const SalaNegocios = ({usuario, socket}) => {

    const URL_DATOSGENERAL = 'http://localhost:4001/api/dashboard/sala-negocios'
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
        const datos = {
            room: localStorage.getItem("sala"),
            user: localStorage.getItem("usuario")
        }
        socket.emit("leave_room", datos);
        console.log("[+] Usuarios actuales en la sala:", usuariosActuales());
        navigate("/dashboard");
    }

    function formatTime(minutes) {
        if (minutes < 10) {
            minutes = "0" + minutes;
            return minutes;
        }else{
            return minutes;
        }
    }

    const enviarMensaje = async() => {
        const enviarDatos = {
            user:localStorage.getItem("usuario"),
            room:localStorage.getItem("sala"),
            message:mensaje,
            time:
            new Date(Date.now()).getHours() +
            ":" +
            formatTime(new Date().getMinutes())
        }

        const enviarDataFetch = {
            nombreSala:localStorage.getItem("sala"),
            usuario:localStorage.getItem("usuario"),
            mensaje:mensaje,
            fecha:new Date(Date.now()).getHours() +
            ":" +
            formatTime(new Date().getMinutes())
        }

        fetch(URL_ENVIAR_DATOS, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            },
            body:JSON.stringify(enviarDataFetch)
        }).then(res => res.json())
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
            setMensajesBBDD(datos.mensajesGeneral);
          })
    }

    useEffect(()=> {
        recuperarMensajes();

    },[mensajesBBDD]); // 

    useEffect(() => {
        setEnviadoM(!enviadoM);

        socket.on('received_message', (data) => {
            setRecibidoMensaje((list) => [...list, data]);
        });
        
        return () => {
            socket.off('received_message');
        };
    },[]);

    const usuariosActuales = () => {
    
        
        socket.on("users_conectados", users => {
            users.forEach(user => {
                console.log(user);
            })
        })
        

    }



  return (
    <div>
        <header className="cabecera">
            <div className="cabecera__back" onClick={() => volverDashboard()}>
                <ChevronLeft size={"60px"} /> Volver
            </div>
            <h2>Negocios</h2>
            <p>Usuario: {usuario}</p>
        </header>
        <main className="chat">
            <div className="generalChat">
                <div className="vistaChat">
                <ScrollToBottom className="mensajeContenedor">
                    {mensajesBBDD.map((message,i) => (
                        <>
                        <div className="mensajesChat" id={usuario === message.mensajes[0].usuario ? "you" : "other"}>
                            <span className="separarNombreTextoAvatar">
                                <img src="https://w7.pngwing.com/pngs/86/905/png-transparent-rick-sanchez-morty-smith-computer-icons-others-head-morty-smith-pickle-rick.png" style={{width:'25px', filter:'brightness(1.1)', mixBlendMode:'multiply'}} />
                                <span>
                                <span key={i} className="usuarioChat">{message.mensajes[0].usuario}:</span> <span className="mensajeUsuario">{message.mensajes[0].mensaje}</span>
                                </span>
                            </span>
                            <div className="usuarioChat">
                                <em>{message.mensajes[0].fecha}h</em>
                            </div>
                        </div>
                        </>
                    ))}
                    </ScrollToBottom>
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
            <footer className="bg-white mt-2">
                <div className="mx-auto max-w-screen-xl px-2 pt-16 sm:px-6 lg:px-4 lg:pt-24">
                    <div className="text-center">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-5xl">Sé respetuoso</h2>

                    <p className="mx-auto mt-1 max-w-sm text-gray-500">
                        Ten respeto por la gente, no insultes ni digas cosas personales
                    </p>

                    </div>

                </div>
            </footer>
        </main>
    </div>
  )
}
