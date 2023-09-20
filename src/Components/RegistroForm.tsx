//@ts-nocheck
import React, {useState} from 'react'
import useForm from '../Hooks/useForm.ts'

export default function RegistroForm() {
    const [registro, handleChange] = useForm({
        tipo: '',
        status: '',
        fecha_creado: '',
        fecha_pendiente: '',
        evidencia: '',
    })
    const {tipo, status, fecha_creado, fecha_pendiente, evidencia} = registro


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(registro)
    }

    return (
        <form onSubmit={handleSubmit}>
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
                <input type='text' className='form-control' name='evidencia' value={evidencia} onChange={handleChange} />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    )
}