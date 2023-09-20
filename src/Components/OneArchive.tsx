//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Alert, Button, Container, Grid, Table, TableBody, TableHead, TableRow, TableCell, Typography } from "@mui/material";

import useForm from '../Hooks/useForm.ts';
import { getArchive, updateArchive } from '../Service/ArchiveService.ts'
import { Demanda } from '../Models/file.ts';
import { downloadFile } from '../firebaseStorage.ts';
import { RegistroTable } from './RegistroTable.tsx';

const emptyArchive: Demanda = {
  no_exp: '',
  demandante: {
    nombre: '',
    calle: '',
    numero: '',
    colonia: '',
    codigoPostal: '',
    municipio: '',
    estado: ''
  },
  resolucion: {
    fecha: new Date(),
    impugnacion: '',
    conceptos: '',
  },
  demandado: '',
  motivos: '',
  pruebas: [''],
  tercero: {
    nombre: '',
    calle: '',
    numero: '',
    colonia: '',
    codigoPostal: '',
    municipio: '',
    estado: ''
  },
  registro: [
    {
      id: '',
      tipo: '',
      evidencia: '',
      fecha: new Date(),
    },
  ]
}

function OneArchive() {

  const { id } = useParams()
  const [archive, setArchive] = useState<Archive>(emptyArchive)
  //const [archiveData, handleChange, setDataState] = useForm(archive);
  const { no_exp,
    demandante: { nombre, calle, numero, colonia, codigoPostal, municipio, estado },
    resolucion: { fecha, impugnacion, conceptos },
    demandado, motivos, pruebas,
    tercero: { nombre: nombre_t, calle: calle_t, numero: numero_t, colonia: colonia_t, codigoPostal: cp_t, municipio: municipio_t, estado: estado_t },
    registro } = archive;
  
  const [urlFile, setUrlFile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getArchiveData();
  }, []);

  const getArchiveData = async () => {
    try {
      const archive = await getArchive(id)
      const { no_exp: idDemanda, pruebas: filename, resolucion: {fecha: date}} = archive
      console.log(new Date(date))
      await getUrl(idDemanda, filename)
      setArchive(archive)
      //setDataState(archive)
      
    } catch (error) {
      console.log(error)  
    }
    
  }

  const updateData = async () => {
    console.log(archiveData)
    const result = await updateArchive(id, archiveData);
    result ? setSuccess("Expediente creado") : setError("Algo salió mal");
  }

  const getUrl = async (id: string, filename: string) => {
    const url = await downloadFile(id, filename)
    setUrlFile(url)
    console.log(url)
  }

  return (
    <Container sx={{width:1}}>
      <Grid item md={4} sm={6} xs={12} spacing={2} marginTop={3}>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Typography variant="h4" align="center" fontWeight={'bold'}>
          Datos generales
        </Typography>
      </Grid>

      <Typography variant="h6" align="center">
        <strong>No. Demanda:</strong> {no_exp}
      </Typography>

      <Container sx={{ margin: 2, display:'flex', flexDirection:'row' }}>
        <Grid item textAlign={"center"} width={1/4} key={'demandandte'}>
          <Typography variant='h5'> <strong>Demandandante</strong> </Typography>
          <hr/>
          <Table>
            <TableRow>
              <Typography h6 align='left'>< strong>Nombre:</strong> {nombre}</Typography>
              <Typography h6 align='left'> <strong>Calle:</strong> {calle}</Typography>
              <Typography h6 align='left'> <strong>Número:</strong> {numero}</Typography>
              <Typography h6 align='left'> <strong>Colonia:</strong> {colonia}</Typography>
              <Typography h6 align='left'> <strong>Código Postal:</strong> {codigoPostal}</Typography>
              <Typography h6 align='left'> <strong>Municipio:</strong> {municipio}</Typography>
              <Typography h6 align='left'> <strong>Estado:</strong> {estado}</Typography>

            </TableRow>
          </Table>
        </Grid>

        <Grid item textAlign={'center'} width={1/4} key={'resolucion'}>
          <Typography variant='h5'> <strong>Resolución</strong> </Typography>
          <hr/>
          <Table>
            <TableRow>
              <Typography h6 align='left'> <strong>Fecha:</strong> {JSON.stringify(fecha)}</Typography>
              <Typography h6 align='left'> <strong>Impugnación:</strong> {impugnacion}</Typography>
              <Typography h6 align='left'> <strong>Conceptos:</strong> {conceptos}</Typography>
            </TableRow>
          </Table>
        </Grid>

        <Grid item textAlign={'center'} width={1/4} key={'demandado'}>
          <Typography variant='h5'> <strong>Demandado</strong> </Typography>
          <hr/>
          <Table>
            <TableRow>
              <Typography h6 align='left'> <strong>Nombre:</strong> {demandado}</Typography>
              <Typography h6 align='left'> <strong>Motivos:</strong> {motivos}</Typography>
              <Typography h6 align='left'> <strong>Prueba:</strong> {pruebas}</Typography>
              {urlFile !== ''&& <a className='btn btn-info' style={{margin:5}} href={urlFile} download>Descargar prueba</a>}
              
            </TableRow>
          </Table>
        </Grid>

        <Grid item textAlign={'center'} width={1/4} key={'tercero'}>
          <Typography variant='h5'> <strong>Tercero</strong> </Typography>
          <hr/>
          <Table>
            <TableRow>
              <Typography h6 align='left'> <strong>Nombre:</strong> {nombre_t}</Typography>
              <Typography h6 align='left'> <strong>Calle:</strong> {calle_t}</Typography>
              <Typography h6 align='left'> <strong>Número:</strong> {numero_t}</Typography>
              <Typography h6 align='left'> <strong>Colonia:</strong> {colonia_t}</Typography>
              <Typography h6 align='left'> <strong>Código Postal:</strong> {cp_t}</Typography>
              <Typography h6 align='left'> <strong>Municipio:</strong> {municipio_t}</Typography>
              <Typography h6 align='left'> <strong>Estado:</strong> {estado_t}</Typography>
            </TableRow>
          </Table>
        </Grid>

      </Container>

      <hr/>
      <RegistroTable registros = {registro} />
    
    </Container>

  )
}

export default OneArchive