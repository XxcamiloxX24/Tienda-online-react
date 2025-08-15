import { useEffect } from "react";
import useFetchOne from "./usefetchOne";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';


function Perfil() {
    const { data: usuario } = useFetchOne('https://fakestoreapi.com/users/', localStorage.getItem("IdUser"))
    const user = localStorage.getItem("IdUser");
    useEffect(() => {
        if (usuario) console.log(usuario);
    }, [usuario]);
    
    return (
        <div className="perfil">
            {user == null  && <b>No has iniciado sesion</b>}
            {usuario && (
                <div className="perfil-info">
                    <div className="infoPersonal">
                        <Link to="/productos"><ArrowBackIcon/></Link>
                        <h2 className="tituloPerfil">Perfil de Usuario</h2>
                        <br />
                        <PersonIcon sx={{ fontSize: 200 }} />
                        <br />
                        <h3>{usuario.username}</h3>
                    </div>   
                    <div className="datos">
                        <h3>Datos Personales</h3>
                        <Grid container spacing={12}>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Nombre</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        fullWidth
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.name.firstname}
                                        label="Nombre"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Apellido</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.name.lastname}
                                        label="Apellido"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Correo</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.email}
                                        label="Correo"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Numero</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.phone}
                                        label="Numero"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />
                        <hr style={{border: 'none', height: '1px', backgroundColor: 'black'}}/>
                        <h3>Direccion</h3>
                        <Grid container spacing={12}>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Ciudad</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        fullWidth
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.address.city}
                                        label="Ciudad"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Barrio</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.address.street}
                                        label="Barrio"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">N#</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.address.number}
                                        label="N#"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">zipcode</InputLabel>
                                    <OutlinedInput sx={{ m: 0, width: '30dvw' }}
                                        disabled
                                        id="component-outlined"
                                        defaultValue={usuario.address.zipcode}
                                        label="zipcode"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )}
            
        </div>
    )
    
}

export default Perfil;