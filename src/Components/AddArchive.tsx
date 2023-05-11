//@ts-nocheck
import React from 'react'
import { addArchive } from '../Service/ArchiveService.ts'

function AddArchive() {

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <h2>Add New Archive</h2>
                <hr/>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-12">
                <form action="add-object.php" method="post">
                    <div className="form-group">
                    <label for="archive-number">Archive Number:</label>
                    <input type="text" className="form-control" id="archive-number" name="archive-number" required/>
                    </div>
                    <div className="form-group">
                    <label for="client">Client:</label>
                    <select className="form-control" id="client" name="client" required>
                        <option value="">Select a client</option>
                        <option value="Client A">Client A</option>
                        <option value="Client B">Client B</option>
                        <option value="Client C">Client C</option>
                    </select>
                    <small className="form-text text-muted">If the client is not listed, please enter their name in the text box below.</small>
                    </div>
                    <div className="form-group">
                    <label for="new-client">New client name:</label>
                    <input type="text" className="form-control" id="new-client" name="new-client"/>
                    </div>
                    <button type="submit" className="btn btn-success">Add Object</button>
                </form>
                </div>
            </div>
        </div>


    )
}

export default AddArchive