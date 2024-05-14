import React from 'react'
import { Outlet, Link } from 'react-router-dom';



export const Header = () => {
  return (
    <nav>
        <ul>
            <li>
                <p>Chatting.io</p>
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
