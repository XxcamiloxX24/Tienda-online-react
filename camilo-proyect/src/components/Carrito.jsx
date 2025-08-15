import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [IDproductos, setIDproductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener IDs del carrito al montar
    const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
    setIDproductos(carritoLocal);
  }, []);

  useEffect(() => {
    async function fetchProductos() {
      setLoading(true);
      try {
        const peticiones = IDproductos.map(id =>
          axios.get(`https://fakestoreapi.com/products/${id}`)
        );
        const respuestas = await Promise.all(peticiones);
        const datos = respuestas.map(res => res.data);
        setProductos(datos);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    }

    if (IDproductos.length > 0) {
      fetchProductos();
    } else {
      setProductos([]);
      setLoading(false);
    }
  }, [IDproductos]);

  const eliminarProducto = (id) => {
    const nuevoCarrito = IDproductos.filter((itemId) => itemId !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setIDproductos(nuevoCarrito); // Esto vuelve a cargar productos
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (productos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', padding: '2rem' }}>
        <Typography variant="h6" color="textSecondary">
          El carrito está vacío.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="caption table">
        <caption>Productos en el carrito</caption>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => {
            const cantidad = producto.count || 1;
            const total = producto.price * cantidad;
            return (
              <TableRow key={producto.id}>
                <TableCell component="th" scope="row">
                  <img
                    src={producto.image}
                    alt={producto.title}
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  />
                </TableCell>
                <TableCell align="right">${producto.price.toFixed(2)}</TableCell>
                <TableCell align="right">{cantidad}</TableCell>
                <TableCell align="right">${total.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <button onClick={() => eliminarProducto(producto.id)}>
                    Eliminar
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Carrito;
