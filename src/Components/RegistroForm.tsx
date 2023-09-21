//@ts-nocheck
import React, {useState} from 'react'
import useForm from '../Hooks/useForm.ts'
import { uploadFileRegistro } from '../firebaseStorage.ts'
import { addRegistroToEvidence } from '../Service/ArchiveService.ts'
import { useParams } from 'react-router-dom'

export default function RegistroForm() {
    const {id, no} = useParams()
    console.log(no)
    const [registro, handleChange] = useForm({
        tipo: '',
        status: '',
        fecha_creado: '',
        fecha_pendiente: '',
        evidencia: '',
    })
    const {tipo, status, fecha_creado, fecha_pendiente, evidencia} = registro
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [evidenciaFile, setEvidencia] = useState(null)


    const save = async () => {
        if(evidenciaFile !== null){
            console.log(evidenciaFile)
            registro.evidencia = [evidenciaFile.name];
        }
        try {
           const response = await uploadFileRegistro(no, evidencia)
           response ? setSuccess("Evidencia guardada") : setError("Algo salió mal al subir evidencia");
           console.log('archivo guardado')
            
           const reg = await addRegistroToEvidence(id, registro)
           console.log('data',reg)
           //const result = await addArchive(archiveData);
           //result ? setSuccess("Demadna creado") : setError("Algo salió mal");
           //console.log(archiveData)
        } catch (error) {
           console.log(error)
        }
     }
     const handleFiles = async (e) => {

        const files = e.target.files;
        if (files.length === null) return;
        const file = files[0];
        setEvidencia(file)
  
     }

    return (
        <div>
            <div className='form-group'>
                <label htmlFor='tipo'>Tipo</label>
                <input type='text' className='form-control' name='tipo' value={tipo} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='status'>Status</label>
                <input type='text' className='form-control' name='status' value={status} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='fecha_creado'>Fecha creado</label>
                <input type='text' className='form-control' name='fecha_creado' value={fecha_creado} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='fecha_pendiente'>Fecha pendiente</label>
                <input type='text' className='form-control' name='fecha_pendiente' value={fecha_pendiente} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='evidencia'>Evidencia</label>
                <input type='file' className='form-control' name='evidencia' onChange={e=>handleFiles(e)} />
            </div>
            <button type='submit' className='btn btn-primary' onClick={save}>Submit</button>
        </div>
    )
}