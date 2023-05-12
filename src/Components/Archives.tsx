//@ts-nocheck
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TableCell, TableRow, Alert  } from "@mui/material";

import {getArchives, deleteArchive} from "../Service/ArchiveService.ts"

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
        const result = await deleteArchive(id);
        result ? setSuccess("Expediente eliminado") : setError("Algo salió mal");
        getArchivesData()
        
    }

return(
     <div className="container mt-4">
        { success && <Alert severity="success">{success}</Alert>}
        { error && <Alert severity="error">{error}</Alert>}
        <h3>Expedientes</h3>
        <NavLink to={`/archives/0`} className="btn btn-success mx-2">Agregar Nuevo</NavLink>
        <table className="table table-striped">
            <thead>
                <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Número de Expediente</th>
                <th scope="col">Cliente</th>
                <th scope="col">Evidencias Totales</th>
                <th scope="col">Fecha de ultima evidencia</th>
                {/* <th scope="col">Fecha de última actualización</th> */}
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
            {archives.map((archive: QueryDocumentSnapshot<DocumentData>) => {

                const { archiveNo, client, totalEvidence, lastUpdated } = archive.data();
                const { id } = archive;
                return (
                    <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{archiveNo}</TableCell>
                        <TableCell align="left"> {client}</TableCell>
                        <TableCell align="left">{totalEvidence}</TableCell>
                        <TableCell align="left">{JSON.stringify(lastUpdated)}</TableCell>
                        
                        <TableCell >
                            <NavLink 
                            to={`/archive/${id}`} 
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