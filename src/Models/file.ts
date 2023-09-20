export interface Demanda {
    no_exp : string,
    demandante: Persona,
    resolucion :{
        fecha : Date,
        impugnacion : string,
        conceptos: string,
    },
    demandado: string,
    motivos: string,
    pruebas: [ string ],
    tercero : Persona,
    registro : [ Registro ]
}

interface Persona {
    nombre : string,
    calle : string,
    numero : string,
    colonia : string,
    codigoPostal : string,
    municipio : string,
    estado : string
}

interface Registro {
    id: string,
    tipo: string,
    status: string,
    fechaCreado : Date,
    fechaPendiente : Date,
    evidencia : string,
}