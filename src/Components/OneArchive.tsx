//@ts-nocheck
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Alert, Button, Container, Grid, TextField, Typography } from "@mui/material";

import useForm from '../Hooks/useForm.ts';
import { getArchive, updateArchive } from '../Service/ArchiveService.ts'
import { Archive } from '../Models/file.ts';

const emptyArchive: Archive = {
    archiveNo: "",
    client: "",
    evidence: "",
    totalEvidence: 0,
    lastUpdated: new Date()
    //filesArray:[]
}

function OneArchive() {
    
    const {id} = useParams()
    const [archive, setArchive ] = useState<Archive>(emptyArchive)
    const [archiveData, handleChange, setDataState] = useForm(archive);
    const { archiveNo, client, evidence, totalEvidence, lastUpdated } = archiveData; 

    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    useEffect(() => {
        getArchiveData();
    },[]);

    const getArchiveData = async () => {
        const archive = await getArchive(id)
        setArchive(archive)
        setDataState(archive)
    }

    const updateData = async () => {
      console.log(archiveData)
        const result = await updateArchive(id, archiveData);
        result ? setSuccess("Expediente creado") : setError("Algo salió mal");
    }

    return(
        <Container>
            <Grid container spacing={2} marginTop={3}>
          <Grid container>
            <Grid item md={4} sm={3} xs={0}></Grid>
            <Grid item md={4} sm={6} xs={12}>
                { success && <Alert severity="success">{success}</Alert>}
                { error && <Alert severity="error">{error}</Alert>}
              <Typography variant="h4">
                Actualizar expediente
              </Typography>
            </Grid>
          </Grid>
          <Grid container marginTop={3}>
            <Grid item md={4} sm={3} xs={0}></Grid>
              <Grid item md={4} sm={6} xs={12}>
              <TextField disabled={true} type="text" name="archiveNo" value={archiveNo} onChange={handleChange} fullWidth={true} label="Archive" variant="outlined" />
              <br/><br/>
              <TextField type="text" name="client" value={client} onChange={handleChange} fullWidth={true} label="Client" variant="outlined" />
              <br/><br/>
              <TextField type="text" name="evidence" value={evidence} onChange={handleChange} fullWidth={true} label="Evidence" variant="outlined" />
              <br/><br/>
              <TextField type="number" name="totalEvidence" value={totalEvidence} onChange={handleChange} fullWidth={true} label="" variant="outlined" />
              <br/><br/>
              <TextField type="date" name="lastUpdated" value={lastUpdated} onChange={handleChange} fullWidth={true} label="" variant="outlined" />
              <br/><br/>
              <Button variant="outlined" onClick={updateData}> Guardar </Button>
              </Grid>
            </Grid>
            </Grid>
        </Container>

    )
}

export default OneArchive