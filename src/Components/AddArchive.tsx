//@ts-nocheck
import React, { useState } from 'react'
import { Alert, Button, Container, Grid, InputLabel, Typography } from "@mui/material";
import useForm from '../Hooks/useForm.ts';
import { addArchive } from '../Service/ArchiveService.ts'
import { Demanda } from '../Models/file.ts';
import { uploadFile } from '../firebaseStorage.ts';
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
const TEXT_FIELD = {
   height: 35,
   width: 200,
   border: '1px lightGray solid',
   margin: 5
}
const SELECT_FIELD = {
   width: '75%',
   height: 55,
   border: '1px lightGray solid'
}
function AddArchive() {

   const [archiveData, handleChange] = useForm(emptyArchive);
   const { no_exp,
      demandante: { nombre, calle, numero, colonia, codigoPostal, municipio, estado },
      resolucion: { fecha, impugnacion, conceptos },
      demandado, motivos, pruebas,
      tercero: { nombre: nombre_t, calle: calle_t, numero: numero_t, colonia: colonia_t, codigoPostal: cp_t, municipio: municipio_t, estado: estado_t },
      registro } = archiveData;

   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [evidencia, setEvidencia] = useState('');
   const [tercero, setTercero] = useState(false);

   const save = async () => {

      archiveData.pruebas = [evidencia.name];
      console.log(evidencia)
      try {
         const response = await uploadFile(no_exp, evidencia)
         response ? setSuccess("Evidencia guardada") : setError("Algo salió mal al subir evidencia");
         console.log('archivo guardado')

         const result = await addArchive(archiveData);
         result ? setSuccess("Demadna creado") : setError("Algo salió mal");
         console.log(archiveData)
      } catch (error) {
         console.log(error)
      }

   }

   const handleTercero = (e) => {
      setTercero(e.target.value)
   }

   const handleFiles = async (e) => {

      const files = e.target.files;
      if (files.length === 0) return;
      const file = files[0];
      setEvidencia(file)

   }

   return (
      <Container sx={{ width: 1 }}>

         <Grid item md={4} sm={6} xs={12} spacing={2} marginTop={3}>
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="h4" align="center">
               Crear expediente nuevo
            </Typography>
         </Grid>

         <Container sx={{ margin: 2 }}>

            <Grid item textAlign={"center"}>
               <InputLabel>Identificador de expediente </InputLabel>
               <input type="text" name="no_exp" value={no_exp} onChange={handleChange} style={TEXT_FIELD} />
            </Grid>
            <Grid >
               <Typography variant='h6'>Demandante</Typography>
            </Grid>
            <Grid display={"flex"} md={4} sm={6} xs={12} flexDirection={'row'} spacing={3} margin={1}>

               <Grid item width={1 / 4} key={'demandante'}>

                  <InputLabel>Nombre </InputLabel>
                  <input style={TEXT_FIELD} type="text" data-id='demandante' name="nombre" value={nombre} onChange={handleChange} />

                  <Typography variant='h7'>Dirección </Typography>
                  <div style={{ margin: 10 }}>
                     <InputLabel>Calle </InputLabel>
                     <input style={TEXT_FIELD} type="text" data-id='demandante' name="calle" value={calle} onChange={handleChange} />

                     <InputLabel>Número </InputLabel>
                     <input style={TEXT_FIELD} type="text" data-id='demandante' name="numero" value={numero} onChange={handleChange} />

                     <InputLabel>Colonia </InputLabel>
                     <input style={TEXT_FIELD} type="text" data-id='demandante' name="colonia" value={colonia} onChange={handleChange} />

                     <InputLabel>Codigo Postal </InputLabel>
                     <input style={TEXT_FIELD} type="text" data-id='demandante' name="codigoPostal" value={codigoPostal} onChange={handleChange} />

                     <InputLabel>Municipio </InputLabel>
                     <input style={TEXT_FIELD} type="text" data-id='demandante' name="municipio" value={municipio} onChange={handleChange} />

                     <InputLabel>Estado </InputLabel>
                     <input style={TEXT_FIELD} type="text" data-id='demandante' name="estado" value={estado} onChange={handleChange} />
                  </div>

               </Grid>
               <Grid item width={1 / 4} key={'impugnacion'}>
                  <InputLabel>Impugnación </InputLabel>
                  <input style={TEXT_FIELD} type="text" data-id='resolucion' name="impugnacion" value={impugnacion} onChange={handleChange} />

                  <InputLabel>Coneceptos </InputLabel>
                  <input style={TEXT_FIELD} type="text" data-id='resolucion' name="conceptos" value={conceptos} onChange={handleChange} />

                  <InputLabel>Fecha </InputLabel>
                  <input style={TEXT_FIELD} type="date" data-id='resolucion' name='fecha' value={fecha} onChange={handleChange} />

               </Grid>
               <Grid item width={1 / 4} key={'demandado'}>
                  <InputLabel>Nombre del demandado </InputLabel>
                  <input style={TEXT_FIELD} type="text" name="demandado" value={demandado} onChange={handleChange} />

                  <InputLabel>Motivos </InputLabel>
                  <input style={TEXT_FIELD} type="text" name="motivos" value={motivos} onChange={handleChange} />

                  <InputLabel>Pruebas </InputLabel>
                  <input style={TEXT_FIELD} type="file" name="pruebas" onChange={(e) => handleFiles(e)} />

               </Grid>
               <Grid item width={1 / 4} key={'tercero'}>
                  <div style={{ height: 68 }}>

                     <InputLabel>¿Existe tercero? </InputLabel>
                     <input type="radio" name="tercero" value={true} onChange={e => handleTercero(e)} /> Si
                     <input type="radio" name="tercero" value={false} onChange={e => handleTercero(e)} style={{ marginLeft: 10 }} /> No
                  </div>

                  {tercero === 'true' &&
                     <div style={{ margin: 0 }}>

                        <InputLabel>Nombre </InputLabel>
                        <input style={TEXT_FIELD} type="text" data-id='tercero' name="nombre" value={nombre_t} onChange={handleChange} />

                        <Typography variant='h7'>Dirección </Typography>
                        <div style={{ margin: 10 }}>
                           <InputLabel>Calle </InputLabel>
                           <input style={TEXT_FIELD} type="text" data-id='tercero' name="calle" value={calle_t} onChange={handleChange} />

                           <InputLabel>Número </InputLabel>
                           <input style={TEXT_FIELD} type="text" data-id='tercero' name="numero" value={numero_t} onChange={handleChange} />

                           <InputLabel>Colonia </InputLabel>
                           <input style={TEXT_FIELD} type="text" data-id='tercero' name="colonia" value={colonia_t} onChange={handleChange} />

                           <InputLabel>Codigo Postal </InputLabel>
                           <input style={TEXT_FIELD} type="text" data-id='tercero' name="codigoPostal" value={cp_t} onChange={handleChange} />

                           <InputLabel>Municipio </InputLabel>
                           <input style={TEXT_FIELD} type="text" data-id='tercero' name="municipio" value={municipio_t} onChange={handleChange} />

                           <InputLabel>Estado </InputLabel>
                           <input style={TEXT_FIELD} type="text" data-id='tercero' name="estado" value={estado_t} onChange={handleChange} />
                        </div>

                     </div>
                  }
               </Grid>
            </Grid>
            <button className="btn btn-info mx-2" variant="outlined" onClick={save}> Guardar </button>
         </Container>

      </Container>

   )
}

export default AddArchive