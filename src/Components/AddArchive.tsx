//@ts-nocheck
import React, {useState} from 'react'
import useForm from '../Hooks/useForm.ts';
import { addArchive } from '../Service/ArchiveService.ts'

function AddArchive() {

    const [formUser, handleChange] = useForm(user || emptyUser);

    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const { name, role, salary, address } = formUser; 

    const save = async () => {
        const result = await addArchive(formUser);
        result ? setSuccess("Expediente creado") : setError("Algo salió mal");
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                <h2>Crear nuevo expediente</h2>
                <hr/>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-12">
                <form action="add-object.php" method="post">
                    <div className="form-group">
                        <label for="archive-number">Numero de expediente:</label>
                        <input type="text" className="form-control" id="archive-number" name="archive-number" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                           {/*  <label for="client">Cliente:</label>
                            <select className="form-control" id="client" name="client" value={} onChange={handleChange} required>
                                <option value="">Selecciona a client</option>
                                <option value="Client A">Client A</option>
                                <option value="Client B">Client B</option>
                                <option value="Client C">Client C</option>
                            </select>
                            <small className="form-text text-muted">If the client is not listed, please enter their name in the text box below.</small> */}
                        </div>
                        <div className="form-group">
                            <label for="new-client">Nuevo cliente:</label>
                            <input type="text" className="form-control" id="new-client" name="new-client" onChange={handleChange}/>
                            <br/>
                            <h3>Subir Archivo</h3>
                            <p>Seleccione el archivo que desea subir:</p>
                            <input type="text" className="form-control" id="archive-url" name="archive-url" onChange={handleChange} required/>
                            {/* <div class="form-group">
                                <label for="fileInput">Archivo:  </label>
                                <span>  </span>
                                <input type="file" class="form-control-file" id="fileInput" name="fileInput" accept=".pdf,.jpg,.jpeg" multiple/>
                            </div> */}
                        </div>
                        <br/>
                    <button type="submit" className="btn btn-success" onClick={save}>Guardar</button>
                </form>
                </div>
            </div>
        </div>


    )
}

export default AddArchive