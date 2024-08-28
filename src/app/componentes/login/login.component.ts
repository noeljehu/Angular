import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../modelos/cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.user.trim() === '' || this.password.trim() === '') {
      // Validación de campos vacíos
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Muestra un cargando mientras se realiza el proceso de login
    Swal.fire({
      title: 'Iniciando sesión...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.login(this.user, this.password).subscribe({
      next: (cliente: Cliente) => {
        Swal.close(); // Cierra el diálogo de cargando
        Swal.fire({
          title: '¡Login exitoso!',
          text: `Bienvenido, ${cliente.nombre}!`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/cliente']); // Navegar al dashboard después del éxito
        });
      },
      error: (error) => {
        Swal.close(); // Cierra el diálogo de cargando
        console.error('Error de inicio de sesión:', error);
        Swal.fire({
          title: 'Error de inicio de sesión',
          text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  irACrearCliente() {
    this.router.navigate(['/crearCliente']);
  }
}
