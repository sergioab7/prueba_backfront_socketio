import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const SalaGeneral = ({usuario, socket}) => {
    const [mensaje, setMensaje] = useState('');
    const [recibidoMensaje, setRecibidoMensaje] = useState([]);

    const navigate = useNavigate();
    //const location = useLocation(); 

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

        console.log(enviarDatos);
        await socket.emit('send_message_to_room', enviarDatos);
        setRecibidoMensaje((list) => [...list, enviarDatos]);
    }

    useEffect(() => {
        socket.on('received_message', (data) => {
            console.log("HOLA PASO POR AQUI");
            console.log("mensaje recibido: " + data.message);
            setRecibidoMensaje((list) => [...list, data]);
        });

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
                    {recibidoMensaje.map((message,i) => (
                        <>
                        <div className="mensajesChat">
                        <p key={i}>{message.message}</p>
                        <div className="usuarioChat">
                            <em>{message.user} | </em>
                            <b>{message.time}</b>
                        </div>
                        </div>
                        </>
                    ))}
                </div>
                <div className="usuariosConectados">
                    <p className="usuariosOnP">Usuarios conectados</p>
                </div>
            </div>
            <div className="textoChat">
                <input type="text" value={mensaje} onChange={e => setMensaje(e.target.value) }/>
                <button onClick={enviarMensaje}>Enviar</button>
            </div>
        </main>
    </div>
  )
}
