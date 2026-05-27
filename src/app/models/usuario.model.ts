export interface Usuario {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UsuarioPayload {
    name: string;   
    email: string;
    password: string;
}
