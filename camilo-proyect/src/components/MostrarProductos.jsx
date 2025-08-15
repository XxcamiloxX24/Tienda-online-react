import { useEffect, useState } from "react";
import useFetchOne from "./usefetchOne";
import useFetch from "./useFetch";
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Carta from './Carta'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Carrito from "./Carrito";
function Sidebar({ isVisible }) {
  


  return (
    <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      <Carrito />
    </div>
  );
}

function MostrarProductos(){
    const [showSidebar, setMostrarSidebar] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [open, setOpen] = useState(false);
    const { data: producto, error } = useFetchOne('https://fakestoreapi.com/products/',searchId);
    const user = localStorage.getItem("IdUser")
    const { data: usuario } = useFetchOne('https://fakestoreapi.com/users/', user)
    const [anchorEl, setAnchorEl] = useState(null);
    const [contenido, setContenido] = useState('');
    const { information, loading } = useFetch('https://fakestoreapi.com/products');
    const navigate = useNavigate();

    const mostrarProductosApp = () => {
      const cards = information.map(product => (
        <Carta key={product.id} producto={product} />
      ));
      setContenido(
        <div className="in">
          <div className="buttongroup">
            <ButtonGroup variant="outlined" color='secondary'>
              <Button onClick={() => filtrarCategoria("jewelery")}>Joyeria</Button>
              <Button onClick={() => filtrarCategoria("men's clothing")}>Ropa de Hombre</Button>
              <Button onClick={() => filtrarCategoria("electronics")}>Tecnologia</Button>
              <Button onClick={() => filtrarCategoria("women's clothing")}>Ropa de Mujer</Button>
            </ButtonGroup>
          </div>
          <div className="productos-grid">{cards}</div>
        </div>
      );
    };

    useEffect(() => {
      if (!loading && information && information.length > 0) {
        mostrarProductosApp();
      }
    }, [loading, information]);
  
    function filtrarCategoria(categoria) {
      fetch(`https://fakestoreapi.com/products/category/${categoria}`)
        .then(response => response.json())
        .then(json => {
          console.log(json)
          const cards = json.map(producto => <Carta key={producto.id} producto={producto} />);
          setContenido(
                <>
                    <div className="in">
                      <div className="buttongroup">
                          <ButtonGroup variant="outlined" color='secondary' aria-label="Loading button group">
                            <Button onClick={() => mostrarProductosApp()}>Todos</Button>
                            <Button onClick={() => filtrarCategoria("jewelery")}>Joyeria</Button>
                            <Button onClick={() => filtrarCategoria("men's clothing")}>Ropa de Hombre</Button>
                            <Button onClick={() => filtrarCategoria("electronics")}>Tecnologia</Button>
                            <Button onClick={() => filtrarCategoria("women's clothing")}>Ropa de Mujer</Button>
                          </ButtonGroup>
                      </div>
                      <div className="productos-grid">
                        {cards}
                      </div>
                    </div>
                  </>
          );
        })

    }
    
    
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: 'black',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    return (
        <div className="all">
        <h2 className="sidebar-title">
            <ShoppingCartIcon className="menu-icon" onClick={() => setMostrarSidebar(!showSidebar)} />
            <div className="buscador">
              <TextField
                  id="outlined-basic"
                  label="Buscar"
                  variant="outlined"
                  color='secondary'
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
              />
              <div className="icon" onClick={handleOpen}>
                  <SearchIcon className='icon-search' />
              </div>
            </div>
            <div className="usuario">
              <b>{usuario?.name?.firstname} {usuario?.name?.lastname}</b>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  
                    <MenuItem key="perfil" onClick={() => {
                      handleCloseMenu();
                      navigate('/perfil')
                    }}>Perfil</MenuItem>
                    <MenuItem key="cerrar" onClick={() => {
                      handleCloseMenu();
                      localStorage.removeItem("IdUser")
                      navigate('/login')
                    }}>Cerrar sesion</MenuItem>
                  

                </Menu>
              </div>
            </div>
        </h2>

        <div className="app-layout">
          <Sidebar isVisible={showSidebar} />
          {loading ? (
            <div style={{ display: 'flex', justifySelf: 'center', alignItems: 'center', margin: '10rem' }}>
              <b>Cargando productos...        <CircularProgress color="secondary" /></b>
            </div>
          ) : (
            contenido
          )}
        </div>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Resultado de la búsqueda
            </Typography>
            <hr />
            <div style={{ marginTop: '1rem' }}>
                {error && <Typography color="error">Producto no encontrado.</Typography>}
                {!error && !producto && <Typography>Buscando producto...</Typography>}
                {!error && producto && <Carta producto={producto} />}
            </div>
            </Box>
        </Modal>
        </div>
    );
}

export default MostrarProductos