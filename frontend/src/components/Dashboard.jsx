import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Waypoints } from "lucide-react";

import { useNavigate } from 'react-router-dom';


export const Dashboard = ({usuario, socket, setListaUsuarios}) => {


  const navigate = useNavigate();
  const [sala, setSala] = useState('');

  const chats_globales = [
    { nombre: "General", descripcion: "Flower Power!" },
    { nombre: "Juegos", descripcion: "Eres gamer? Esta es tu sala!" },
    { nombre: "Negocios", descripcion: "Habla de los negocios" }
  ];

  useEffect(() => {

    socket.emit("login", localStorage.getItem("usuario"));

  },[socket]);

  useEffect(() => {
      socket.emit("join_room", {
        user:localStorage.getItem("usuario"),
        room:sala
      });

  }, [sala]);

  const entrarSala = (e) => {
    const nombre = e.target.parentNode.querySelectorAll("p")[1];
    setSala(nombre.textContent.toLowerCase().trim());

    if(sala.toLowerCase().trim() === "general"){
      localStorage.setItem("sala", sala);
      navigate("/sala-general")
    }


  }

  return (
    <div>
      <div className="dashboard-head">
        <h1>Dashboard</h1>
      </div>
      <p>Identificado como: <b>{usuario}</b> </p>
      <p>Aquí puedes entrar en cualquier chat y comunicarte</p>
      <h3>Accede a la sala de chat</h3>
      <div className="card">
        {chats_globales.map((chats,i) => (
          <div className="card-components" key={i}>
            <p className="number" key={i}>{i+1}</p>
            <p className="h1">{chats.nombre} </p>
            <p className="p">{chats.descripcion}</p>
            <button onClick={(e) => entrarSala(e)}>Entrar</button>
          </div>
        )) }
      </div>
    </div>
  )
}
