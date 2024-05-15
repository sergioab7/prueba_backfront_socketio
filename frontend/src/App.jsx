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


function App() {

  const [usuario,setUsuario] = useState('');
  const [autenticado, setAutenticado]=useState(false);

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

  })



  return (
    <Router>
      <div className="container">
        <div className="header">
          <Header autenticado={autenticado}/>
        </div>
        <div className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/sala-general" element={<SalaGeneral usuario={usuario}/>} />
            <Route path="/dashboard" element={<Dashboard usuario={usuario}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
