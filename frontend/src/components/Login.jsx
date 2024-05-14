import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const loginWeb = () => {
        navigate("/dashboard");
    }
  return (
    <div>
        <div className="login-header">
            <h1>Login en Chatting.io</h1>
        </div>
        <form>
            <div className="formulario">
                <input type="text" className="input" placeholder="example@correo.com" />
                <input type="text" className="input" placeholder="*****" />
                <button className="btnLogin" onClick={loginWeb}>Entrar</button>

            </div>
        </form>
    </div>
  )
}
