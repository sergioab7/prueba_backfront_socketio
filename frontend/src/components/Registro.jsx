import React from 'react'

export const Registro = () => {
  return (
    <div>
        <div className="login-header">
            <h1>Registro en Chatting.io</h1>
        </div>
        <form>
            <div className="formulario">
                <input type="text" className="input" placeholder="John" />
                <input type="text" className="input" placeholder="john@example.com" />
                <input type="text" className="input" placeholder="*****" />
                <button className="btnLogin">Registrar</button>

            </div>
        </form>
    </div>
  )
}
