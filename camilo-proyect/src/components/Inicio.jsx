import { Link } from "react-router-dom"

function Inicio(){


    return (
        <div className="Bienvenida">
            <h1>Bienvenidos</h1>
            <h2>Fake Store - Camilo Villalobos</h2>
            <h3>Fuente de information: <a href="https://fakestoreapi.com/">https://fakestoreapi.com/</a>
            <br />
            Se realizó usando React + Vite, Material UI y sus íconos.</h3>
            <Link to="login" className="btnIniciar">Iniciar</Link>
        </div>
    )
}

export default Inicio