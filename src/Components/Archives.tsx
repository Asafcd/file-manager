//@ts-nocheck
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {getArchives} from "../Service/ArchiveService.ts"
import { Archive } from "../Models/file.ts";

function Archives() {
    const [ archives, setArchives ] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
    console.log(archives)

    useEffect(() => {
        getArchivesData();
    },[]);

    const getArchivesData = async () => {
        const archives = await getArchives();
        setArchives(archives); 
    }

return(
    <div className="container mt-4">
        <h3>Expedientes</h3>
        <NavLink to={`/archives/0`} className="btn btn-success mx-2">Agregar Nuevo</NavLink>
        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Número de Expediente</th>
                <th scope="col">Cliente</th>
                <th scope="col">Evidencias Totales</th>
                <th scope="col">Fecha de última actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">2</th>
                    <td>EXP002</td>
                    <td>Cliente B</td>
                    <td>5</td>
                    <td>02/01/2022</td>
                    <td>
                        <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#editExpModal">Actualizar</button>
                        <span> </span>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteExpModal">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

)
}

export default Archives