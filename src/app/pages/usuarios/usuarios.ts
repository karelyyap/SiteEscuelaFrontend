import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios-service';
import { Usuario, UsuarioPayload } from '../../models/usuario.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})

export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];
  loading: boolean = false;
  guardando: boolean = false;
  editando: boolean = false;
  idUsuarioSeleccionado: number = 0;
  errorMessage: string = '';

  formData: UsuarioPayload = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private usuariosService: UsuariosService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
        this.cdr.detectChanges(); // ¡Esta es la línea mágica que actualiza la pantalla!
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }

  guardarUsuario(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.password) {
      this.errorMessage = 'Por favor, llena todos los campos';
      return;
    }
    this.guardando = true;
    if (this.editando) {
      // Código para actualizar un usuario existente
      this.usuariosService.updateUsuario(this.idUsuarioSeleccionado, this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.cargarUsuarios(); 
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al actualizar usuario';
          this.guardando = false;
        }
      });
    }else {
      // Código para crear un usuario nuevo (tu lógica original)
      this.usuariosService.createUsuario(this.formData).subscribe({
        next: () => {
          this.resetForm();
          this.cargarUsuarios(); 
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al registrar usuario';
          this.guardando = false;
        }
      });
    }
  }

  resetForm(): void {
    this.formData = { name: '', email: '', password: '' };
    this.errorMessage = '';
    this.loading = false;
    this.guardando = false;
    this.editando = false; // Apagamos el modo edición
    this.idUsuarioSeleccionado = 0;
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Eliminar usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.editando = true;
    this.idUsuarioSeleccionado = usuario.id;
    // Llenamos el formulario con los datos del usuario que elegimos
    this.formData = {
      name: usuario.name,
      email: usuario.email,
      password: '' // Por seguridad, la contraseña suele dejarse en blanco para que escriban una nueva, o puedes poner usuario.password si tu backend te la envía.
    };
  }


}