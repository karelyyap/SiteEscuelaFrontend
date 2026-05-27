export interface Alumno {
    id: number;
    nombre: string;
    apellido: string;
    matricula: string;
    carrera: string;
    cuatrimestre: string;
    correo: string;
}

export interface AlumnoPayload {
    nombre: string;   
    apellido: string;
    matricula: string;
    carrera: string;
    cuatrimestre: string;
    correo: string;
}