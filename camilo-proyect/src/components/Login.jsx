import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { information, loading, error } = useFetch('https://fakestoreapi.com/users');
    const navigate = useNavigate();
    const [errorMsj, setErrorMsj] = useState(false);

    function insertUser(event){
        setUsername(event.target.value);
        console.log(event.target.value);
    }
    function insertPass(event){
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    function verificarInformacion(event){
        event.preventDefault();
        if (loading)  {
            console.log("cargando usuarios")
            return;
        }

        if (error) {
        console.error("Error al cargar usuarios:", error);
        return;
    }

        const user = information.find(u => u.username === username && u.password === password);
        if (user) {
            alert("Acceso permitido", user);
            localStorage.setItem("IdUser", user.id)
            navigate('/productos')
        } else {
            console.error("Credenciales incorrectas");
            setErrorMsj(true);
        }
        
    }
    return (
        <div className="lgn">
            <div className="box">
                <h1>INICIAR SESION</h1>
                <hr/>
                <form onSubmit={verificarInformacion} className='formulario'>
                    <TextField error={errorMsj} fullWidth label="Nombre de usuario" id="nameUsuario" onChange={insertUser}/>
                    <TextField error={errorMsj} fullWidth id="passUsuario" label="Password" type="password" 
                    helperText={errorMsj ? "Usuario o contraseña incorrectos" : ""}
                    autoComplete="current-password" onChange={insertPass}/>
                    <input type="submit" value="Iniciar sesion" className='btnLogin'/>
                </form>
            </div>
        </div>
    )
}

export default Login