import React from 'react'
import { Header } from './Header'
import { Waypoints } from "lucide-react";

export const Dashboard = () => {

  const chats_globales = [
    { nombre: "General", descripcion: "Flower Power!" },
    { nombre: "Juegos", descripcion: "Eres gamer? Esta es tu sala!" },
    { nombre: "Negocios", descripcion: "Habla de los negocios" }
  ];

  return (
    <div>
      <div className="dashboard-head">
        <h1>Tu Dashboard</h1>
      </div>
      <h3>Accede a la sala de chat</h3>
      <div className="card">
        {chats_globales.map((chats,i) => (
          <div className="card-components">
            <p className="number" key={i}>{i+1}</p>
            <p className="h1">{chats.nombre} </p>
            <p className="p">{chats.descripcion}</p>
          </div>
        )) }
      </div>
    </div>
  )
}
