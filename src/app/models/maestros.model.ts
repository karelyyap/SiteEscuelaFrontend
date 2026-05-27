export interface Maestro {
    id: number;
    nombre: string;
    apellido: string;
    numeroEmpleado: string;
    departamento: string;
    correo: string;
}

export interface MaestroPayload {
    nombre: string;   
    apellido: string;
    numeroEmpleado: string;
    departamento: string;
    correo: string;
}