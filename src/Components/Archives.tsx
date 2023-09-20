//@ts-nocheck
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TableCell, TableRow, Alert  } from "@mui/material";

import {getArchives, deleteArchive} from "../Service/ArchiveService.ts"
import { Demanda } from "../Models/file.ts";

function Archives() {
    const [ archives, setArchives ] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    useEffect(() => {
        getArchivesData();
    },[]);

    const getArchivesData = async () => {
        const archives = await getArchives();
        setArchives(archives); 
    }
    const deleteArchiveData = async (id) => {
        if( window.confirm('Esta accion no se puede deshacer ¿Continuar?')) {
            const result = await deleteArchive(id);
            result ? setSuccess("Expediente eliminado") : setError("Algo salió mal");
            getArchivesData()
        }
        
    }

return(
     <div className="container mt-4">
        { success && <Alert severity="success">{success}</Alert>}
        { error && <Alert severity="error">{error}</Alert>}
        <h3>Demandas</h3>
        <NavLink to={`/archives/0`} className="btn btn-success mx-2">Agregar Nuevo</NavLink>
        <table className="table table-striped">
            <thead>
                <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Número de Expediente</th>
                <th scope="col">Demandandante</th>
                <th scope="col">Resolución</th>
                <th scope="col">Fecha de último registro</th>
                <th scope="col">Fecha máxima pendiente</th>
                {/* <th scope="col">Fecha de última actualización</th> */}
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
            {archives && archives.map((archive: QueryDocumentSnapshot<DocumentData>) => {

                const { no_exp, demandante: {nombre}, resolucion: {impugnacion}, registro } : Demanda = archive.data();
                const { id } : string = archive;
                registro.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
                console.log(registro)
                return (
                    <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{no_exp}</TableCell>
                        <TableCell align="left"> {nombre}</TableCell>
                        <TableCell align="left">{impugnacion}</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                        
                        <TableCell >
                            <NavLink 
                            to={`/archives/${id}`} 
                            className="btn btn-info mx-2"
                            >Actualizar</NavLink>
                            <button 
                            onClick={()=>{deleteArchiveData(id)}}
                            className="btn btn-danger mx-2"
                            >Eliminar</button>
                        </TableCell>
                        
                    </TableRow>
                );
            })}
            </tbody>
        </table>
    </div>  
    
)
}

export default Archives