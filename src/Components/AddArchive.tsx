//@ts-nocheck
import React, {useState} from 'react'
import { Alert, Button, Container, Grid, TextField, Typography } from "@mui/material";
import useForm from '../Hooks/useForm.ts';
import { addArchive } from '../Service/ArchiveService.ts'
import { Archive } from '../Models/file.ts';

const emptyArchive: Archive = {
    archiveNo: "",
    client: "",
    evidence: "",
    totalEvidence: 0,
    lastUpdated: new Date()
    //filesArray:[]
}

function AddArchive() {
    
    const [archiveData, handleChange] = useForm(emptyArchive);
    const { archiveNo, client, evidence, totalEvidence, lastUpdated } = archiveData; 

    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const save = async () => {
        const result = await addArchive(archiveData);
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
                Crear expediente nuevo
              </Typography>
            </Grid>
          </Grid>
          <Grid container marginTop={3}>
            <Grid item md={4} sm={3} xs={0}></Grid>
              <Grid item md={4} sm={6} xs={12}>
              <TextField type="text" name="archiveNo" value={archiveNo} onChange={handleChange} fullWidth={true} label="Archive" variant="outlined" />
              <br/><br/>
              <TextField type="text" name="client" value={client} onChange={handleChange} fullWidth={true} label="Client" variant="outlined" />
              <br/><br/>
              <TextField type="text" name="evidence" value={evidence} onChange={handleChange} fullWidth={true} label="Evidence" variant="outlined" />
              <br/><br/>
              <TextField type="number" name="totalEvidence" value={totalEvidence} onChange={handleChange} fullWidth={true} label="" variant="outlined" />
              <br/><br/>
              <TextField disabled="true" type="date" name="lastUpdated" value={lastUpdated} onChange={handleChange} fullWidth={true} label="" variant="outlined" />
              <br/><br/>
              <Button className="btn btn-success mx-2" variant="outlined" onClick={save}> Guardar </Button>
              </Grid>
            </Grid>
            </Grid>
        </Container>

    )
}

export default AddArchive