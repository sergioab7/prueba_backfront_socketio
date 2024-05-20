// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { Dashboard } from './components/Dashboard';
import { Inicio } from './components/Inicio';
import { useEffect, useState } from 'react';
import { SalaGeneral } from './components/SalaGeneral';
import { SalaJuegos } from './components/SalaJuegos';
import { SalaNegocios } from './components/SalaNegocios';


function App() {
  const socket = io(`http://localhost:4001`);
  const [usuario,setUsuario] = useState('');
  const [autenticado, setAutenticado]=useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  const existeToken = () => {
    const token = localStorage.getItem('token');
    if(token == "" || token == null){
      setAutenticado(false);
    }else{
      setAutenticado(true);
      setUsuario(localStorage.getItem('usuario'));
    }

  }

  useEffect(() => {
    existeToken();

  },[])

 

  return (
    <Router>
        <div className="bg-indigo-600 px-4 py-2 text-white w-full">
          <p className="text-center text-sm font-medium">
            Hecho con &#128155; por
            <a href="https://github.com/sergioab7" className="inline-block underline"> <span className="p-1">Sergio Andújar</span></a>
          </p>
        </div>
      <div className="container">


        <div className="header">
          <Header autenticado={autenticado}/>
        </div>
        <div className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/sala-general" element={<SalaGeneral usuario={usuario} socket={socket}/>} />
            <Route path="/sala-juegos" element={<SalaJuegos usuario={usuario} socket={socket}/>} />
            <Route path="/sala-negocios" element={<SalaNegocios usuario={usuario} socket={socket}/>} />
            <Route path="/dashboard" element={<Dashboard usuario={usuario} socket={socket} setListaUsuarios={setListaUsuarios}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
