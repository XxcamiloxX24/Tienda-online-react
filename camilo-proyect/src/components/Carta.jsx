import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';



function Carta({producto}) {
    const [value, setValue] = useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height:300,
        color: 'black',
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function agregarProd() {
        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
        if (!carritoActual.includes(producto.id)) {
            carritoActual.push(producto.id);
            localStorage.setItem('carrito', JSON.stringify(carritoActual));
            alert('Producto agregado al carrito.');
        } else {
            alert('Este producto ya está en el carrito, si desea mas de un producto, por favor cambie la cantidad en el carrito.');
        }
    }
    return (
    <div className='card'>
        <div className="imagen">
            <img src={producto.image} alt={producto.title} />
            <div className="informacion">
                <h2 className='titulo'>{producto.title}</h2>
                <h4 className='categoria'>{producto.category}</h4>
                <b className='precio'>${producto.price}</b>
                <div className='actions'>
                        <div className="ratee">
                            <Rating name="customized-10" defaultValue={producto.rating.rate} max={5} precision={0.1} readOnly />
                        </div>
                        <div className="botones">
                            <Button color="primary" id="buttonActions"  onClick={handleOpen} variant="contained" endIcon={<SendIcon />}>Detalles</Button>
                            <Button color="secondary" id="buttonActions" onClick={agregarProd} variant="contained" endIcon={<ShoppingBagIcon />}>Comprar</Button>
                        </div>
                        <Modal
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                    {producto.title}
                            </Typography>
                            <hr />
                            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                    {producto.description}
                            </Typography>
                            <div className="btnNav">
                                <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
                                <BottomNavigationAction
                                    label={producto.rating.rate}
                                    value={producto.rate}
                                    icon={<StarIcon />}
                                />
                                <BottomNavigationAction
                                    label={producto.rating.count}
                                    value={producto.rating.count}
                                    icon={<NumbersOutlinedIcon />}
                                />
                                </BottomNavigation>
                            </div>
                            </Box>
                        </Modal>
                </div>
            </div>
        </div>

    </div>
    )
}

export default Carta;