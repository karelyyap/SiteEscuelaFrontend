import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Asegúrate de crear este servicio y modelo en tus carpetas correspondientes
import { MaestrosService } from '../../services/maestros-service';
import { Maestro, MaestroPayload } from '../../models/maestros.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './maestros.html',
  styleUrl: './maestros.scss', // Asegúrate de tener tu archivo de estilos con este nombre
})

export class Maestros implements OnInit {
  maestros: Maestro[] = [];
  loading: boolean = false;
  guardando: boolean = false;
  editando: boolean = false;
  idMaestroSeleccionado: number = 0;
  errorMessage: string = '';

  // Actualizamos el modelo del formulario con los 5 campos de los maestros
  formData: MaestroPayload = {
    nombre: '',
    apellido: '',
    numeroEmpleado: '',
    departamento: '',
    correo: ''
  };

  constructor(private maestrosService: MaestrosService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.loading = true;
    this.maestrosService.getMaestros().subscribe({
      next: (data) => {
        this.maestros = data;
        this.loading = false;
        this.cdr.detectChanges(); // Actualizamos la pantalla al recibir los datos
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar maestros';
        this.loading = false;
      }
    });
  }

  guardarMaestro(): void {
    // Validamos que los 5 campos estén llenos antes de enviar
    if (!this.formData.nombre || !this.formData.apellido || !this.formData.numeroEmpleado || !this.formData.departamento || !this.formData.correo) {
      this.errorMessage = 'Por favor, llena todos los campos obligatorios';
      return;
    }
    
    this.guardando = true;
    
    if (this.editando) {
      // Código para actualizar un maestro existente
      this.maestrosService.updateMaestro(this.idMaestroSeleccionado, this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.cargarMaestros(); 
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al actualizar maestro';
          this.guardando = false;
        }
      });
    } else {
      // Código para crear un maestro nuevo
      this.maestrosService.createMaestro(this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.cargarMaestros(); 
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al registrar maestro';
          this.guardando = false;
        }
      });
    }
  }

  resetForm(): void {
    // Vaciamos los 5 campos
    this.formData = { nombre: '', apellido: '', numeroEmpleado: '', departamento: '', correo: '' };
    this.errorMessage = '';
    this.loading = false;
    this.guardando = false;
    this.editando = false;
    this.idMaestroSeleccionado = 0;
  }

  eliminarMaestro(id: number): void {
    if (confirm('¿Estás seguro de eliminar a este maestro?')) {
      this.maestrosService.deleteMaestro(id).subscribe(() => this.cargarMaestros());
    }
  }

  seleccionarMaestro(maestro: Maestro): void {
    this.editando = true;
    this.idMaestroSeleccionado = maestro.id;
    // Llenamos el formulario con los datos exactos del maestro elegido
    this.formData = {
      nombre: maestro.nombre,
      apellido: maestro.apellido,
      numeroEmpleado: maestro.numeroEmpleado,
      departamento: maestro.departamento,
      correo: maestro.correo
    };
  }
}