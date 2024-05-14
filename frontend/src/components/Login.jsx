import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleFormulario = (e) => {
        e.preventDefault();

        if(email == "" && password == ""){
            console.log("Error, debes poner todas las credenciales")
        }

        const loginUsuario = {
            email,
            password
        }

        fetch("http://localhost:4001/api/auth/login", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(loginUsuario)
        }).then(res => res.json())
          .then(data => {
            localStorage.setItem("token", data.login);
            navigate("/");
          })
        //
    }
  return (
    <div>
        <div className="login-header">
            <h1>Login en Chatting.io</h1>
        </div>
        <form onSubmit={handleFormulario}>
            <div className="formulario">
                <input type="text" className="input" placeholder="example@correo.com"
                onChange={e => setEmail(e.target.value)} />
                <input type="text" className="input" placeholder="*****" 
                onChange={e => setPassword(e.target.value)}/>
                <button className="btnLogin">Entrar</button>

            </div>
        </form>
    </div>
  )
}
