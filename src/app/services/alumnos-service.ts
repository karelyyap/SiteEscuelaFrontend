import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../enviroments/enviroment";
// Importamos el modelo correcto de alumnos
import { Alumno, AlumnoPayload } from "../models/alumnos.model";


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  // Ajustamos las rutas para que apunten a los endpoints de alumnos en tu backend
  private listUrl = `${enviroment.apiUrl}/auth/alumnos`;
  private registerUrl = `${enviroment.apiUrl}/auth/alumnos/registro`;

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.listUrl);
  }

  createAlumno(payload: AlumnoPayload): Observable<Alumno> {
    return this.http.post<Alumno>(this.registerUrl, payload);
  }

  updateAlumno(id: number, payload: AlumnoPayload): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.listUrl}/${id}`, payload);
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.listUrl}/${id}`);
  }

  generarReporteIA(idAlumno: number): Observable<any> {
    // Apuntamos a la nueva ruta que creamos en Node.js para generar el reporte de IA
    return this.http.post<any>(`${enviroment.apiUrl}/auth/alumnos/reporte-ia/${idAlumno}`, {});
  }
}