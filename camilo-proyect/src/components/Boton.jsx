import React, { useState } from "react";
import { Button } from "@mui/material";
function Boton() {
    const[contador, setContador] = useState(0)

    return (
        
        <Button variant="outlined" color="secondary" onClick={() => setContador((contador) => contador + 3)}>{contador}</Button>
    )
}

export default Boton;