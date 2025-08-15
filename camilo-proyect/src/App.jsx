import { Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Perfil from './components/Perfil';
import MostrarProductos from './components/MostrarProductos';
import './App.css';




function App() {
  return (
    <div className="aplicacion">
      <Routes>
        <Route path="/" element={ <Inicio /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="/productos" element={ <MostrarProductos /> } />
        <Route path="/perfil" element={ <Perfil /> } />
        
      </Routes>
    </div>
  )
}


export default App;