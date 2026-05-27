import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos-service';
import { Alumno, AlumnoPayload } from '../../models/alumnos.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss', // Asegúrate de tener tu archivo de estilos con este nombre.
})

export class Alumnos implements OnInit {
  alumnos: Alumno[] = [];
  loading: boolean = false;
  guardando: boolean = false;
  editando: boolean = false;
  idAlumnoSeleccionado: number = 0;
  errorMessage: string = '';
  cargandoIA: boolean = false;
  mostrarModalIA: boolean = false;
  reporteIA: string = '';
  alumnoNombreReporte: string = '';
  formData: AlumnoPayload = {
    nombre: '',
    apellido: '',
    matricula: '',
    carrera: '',
    cuatrimestre: '',
    correo: ''
  };

  constructor(private alumnosService: AlumnosService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.loading = true;
    this.alumnosService.getAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.loading = false;
        this.cdr.detectChanges(); // Actualizamos la pantalla al recibir los datos.
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar los alumnos.';
        this.loading = false;
      }
    });
  }

  guardarAlumno(): void {
    // Validamos que los 6 campos estén llenos antes de enviar.
    if (!this.formData.nombre || !this.formData.apellido || !this.formData.matricula || !this.formData.carrera || !this.formData.cuatrimestre || !this.formData.correo) {
      this.errorMessage = 'Por favor, llena todos los campos obligatorios.';
      return;
    }
    
    this.guardando = true;
    
    if (this.editando) {
      // Código para actualizar un alumno existente.
      this.alumnosService.updateAlumno(this.idAlumnoSeleccionado, this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.cargarAlumnos(); 
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al actualizar el alumno.';
          this.guardando = false;
        }
      });
    } else {
      // Código para crear un alumno nuevo.
      this.alumnosService.createAlumno(this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.cargarAlumnos(); 
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al registrar el alumno.';
          this.guardando = false;
        }
      });
    }
  }

  resetForm(): void {
    // Vaciamos los 6 campos.
    this.formData = { nombre: '', apellido: '', matricula: '', carrera: '', cuatrimestre: '', correo: '' };
    this.errorMessage = '';
    this.loading = false;
    this.guardando = false;
    this.editando = false;
    this.idAlumnoSeleccionado = 0;
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Estás seguro de eliminar a este alumno?')) {
      this.alumnosService.deleteAlumno(id).subscribe(() => this.cargarAlumnos());
    }
  }

  seleccionarAlumno(alumno: Alumno): void {
    this.editando = true;
    this.idAlumnoSeleccionado = alumno.id;
    // Llenamos el formulario con los datos exactos del alumno elegido.
    this.formData = {
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      matricula: alumno.matricula,
      carrera: alumno.carrera,
      cuatrimestre: alumno.cuatrimestre,
      correo: alumno.correo
    };
  }

  // --- NUEVAS FUNCIONES PARA IA ---

  pedirResumenIA(alumno: Alumno): void {
    if (this.cargandoIA) return; // Evitamos múltiples clics

    this.cargandoIA = true;
    this.errorMessage = '';
    this.alumnoNombreReporte = `${alumno.nombre} ${alumno.apellido}`;

    this.alumnosService.generarReporteIA(alumno.id).subscribe({
      next: (data) => {
        // Al recibir el reporte, llenamos el texto y abrimos el modal
        this.reporteIA = data.resumenText;
        this.mostrarModalIA = true;
        this.cargandoIA = false;
        this.cdr.detectChanges(); // Actualizamos la pantalla
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Hubo un error al generar el reporte con Inteligencia Artificial.';
        this.cargandoIA = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModalIA(): void {
    // Cerramos el modal limpiando los datos antiguos
    this.mostrarModalIA = false;
    this.reporteIA = '';
    this.alumnoNombreReporte = '';
  }

}
