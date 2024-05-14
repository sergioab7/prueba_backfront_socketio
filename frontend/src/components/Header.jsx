import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import { Waypoints } from "lucide-react";



export const Header = () => {
  return (
    <nav>
        <ul>
            <li>
                <p><Link to="/"><Waypoints size={"23px"}/></Link></p>
            </li>
            <li>
                <div className="registro">
                    <Link to="/login">Login</Link>
                    <Link to="/registro">Registro</Link>
                </div>
            </li>
        </ul>
        <Outlet />
    </nav>
  )
}
