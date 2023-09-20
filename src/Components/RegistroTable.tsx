import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Grid, Table, TableBody, TableHead, TableRow, TableCell, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom';

export function RegistroTable({registros}) {
    const [registro, setRegistro] = useState(registros)

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
            <Typography variant='h5' align='center'> <strong>Registros</strong> </Typography>
            <NavLink to={'./registro/0'} className='btn btn-primary' style={{width:'25%', margin:10}}>

                Añadir registro
            </NavLink>

            <Table>
                <TableHead>
                    <TableRow>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center' > <strong> Tipo </strong> </TableCell>
                        <TableCell align='center'> <strong> Status </strong> </TableCell>
                        <TableCell align='center'> <strong> Fecha creado </strong> </TableCell>
                        <TableCell align='center'> <strong> Fecha de pentiente </strong> </TableCell>
                        <TableCell align='center'> <strong> Evidencia </strong> </TableCell>
                        <TableCell align='center'> <strong> Acciones </strong> </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {registro.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align='center'>{row.tipo}</TableCell>
                            <TableCell align='center'>{row.status}</TableCell>
                            <TableCell align='center'>{row.fecha_creado}</TableCell>
                            <TableCell align='center'>{row.fecha_pendiente}</TableCell>
                            <TableCell align='center'>{row.evidencia}</TableCell>
                            <TableCell align='center'>
                                <Button variant='contained' color='primary' style={{margin:5}}>Ver</Button>
                                <Button variant='contained' color='primary' style={{margin:5}}>Concluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </Container>
    )
}