import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../enviroments/enviroment";
import { Usuario, UsuarioPayload } from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private listUrl = `${enviroment.apiUrl}/auth/users`;
  private registerUrl = `${enviroment.apiUrl}/auth/register`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.listUrl);
  }

  createUsuario(payload: UsuarioPayload): Observable<Usuario> {
    return this.http.post<Usuario>(this.registerUrl, payload);
  }

  updateUsuario(id: number, payload: UsuarioPayload): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.listUrl}/${id}`, payload);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.listUrl}/${id}`);
  }
}