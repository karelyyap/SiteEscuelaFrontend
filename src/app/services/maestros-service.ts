import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../enviroments/enviroment";
// Importamos el modelo correcto de maestros
import { Maestro, MaestroPayload } from "../models/maestros.model";

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
  private listUrl = `${enviroment.apiUrl}/auth/maestros`;
  private registerUrl = `${enviroment.apiUrl}/auth/maestros/registro`;

  constructor(private http: HttpClient) {}

  getMaestros(): Observable<Maestro[]> {
    return this.http.get<Maestro[]>(this.listUrl);
  }

  createMaestro(payload: MaestroPayload): Observable<Maestro> {
    return this.http.post<Maestro>(this.registerUrl, payload);
  }

  updateMaestro(id: number, payload: MaestroPayload): Observable<Maestro> {
    return this.http.put<Maestro>(`${this.listUrl}/${id}`, payload);
  }

  deleteMaestro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.listUrl}/${id}`);
  }
}