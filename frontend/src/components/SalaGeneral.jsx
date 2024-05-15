import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const SalaGeneral = ({usuario}) => {
    const [mensaje, setMensaje] = useState('');

    const navigate = useNavigate();
    //const location = useLocation(); 

    const volverDashboard = () => {
        console.log(location.pathname);
        navigate("/dashboard");
    }

    const enviarMensaje = () => {
        console.log("Mensaje enviado!");
    }
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
