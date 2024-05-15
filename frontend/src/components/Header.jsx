import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Waypoints, ChevronDown  } from "lucide-react";



export const Header = ({autenticado}) => {

    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [user, setUser] = useState('');

    const abrirMenu = () => {
        setMenuAbierto(!menuAbierto);
    }

    const cerrarSesion = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("usuario", "");
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        setUser(localStorage.getItem('usuario'));
    }, []);

  return (
    <nav>
        <ul>
            <li>
                <p><Link to="/dashboard"><Waypoints size={"23px"}/></Link></p>
            </li>
            <li>
                {
                    autenticado? (
                        <div className="header-usuario-autenticado">
                            <p>Hola, {user}</p>
                            <button onClick={abrirMenu}>{<ChevronDown />}</button>
                            <div className={`${menuAbierto? 'mostrar' : 'oculto'}`}>
                                <Link to="/dashboard"><button>Perfil</button></Link>
                                <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
                            </div>
                        </div>
                    ) : (
                        <div className="registro">
                            <Link to="/login">Login</Link>
                            <Link to="/registro">Registro</Link>
                        </div>
                    )
                }
            </li>
        </ul>
        <Outlet />
    </nav>
  )
}
