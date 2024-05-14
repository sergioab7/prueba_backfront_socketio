import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const Registro = () => {
    const navigate = useNavigate();


    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleForm = async(e) => {
        e.preventDefault();


        if(usuario == "" && password == "" && email == ""){
            setError(true);
        }else{
            setError(false);
            const usuarioRegistrado = {
                usuario:usuario,
                email:email,
                password:password,
            }
            console.log(JSON.stringify(usuarioRegistrado));
            fetch('http://localhost:4001/api/auth/registro', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioRegistrado),
                credentials: 'include' 
            })
            .then(response => response.json())
            .then(data => {
                console.log("Datos:" + data);
                navigate("/login");
            })
            .catch((error) => console.error('Error:', error));
        }

    }

  return (
    <div>
        <div className="login-header">
            <h1>Registro en Chatting.io</h1>
        </div>
        <form onSubmit={handleForm}>
            <div className="formulario">
                <input type="text" className="input" placeholder="John" 
                onChange={e => setUsuario(e.target.value) }
                />
                <input type="text" className="input" placeholder="john@example.com"
                onChange={e => setEmail(e.target.value) }
                 />
                <input type="text" className="input" placeholder="*****"
                onChange={e => setPassword(e.target.value) }
                />
                <button className="btnLogin" >Registrar</button>

            </div>
        </form>
        {error && (
            <h1>Debes ingresar los datos</h1>
        )}
    </div>
  )
}
