import { Component } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent {
  clienteForm: FormGroup;

  // Inyecta el Router en el constructor
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router // Inyecta el Router aquí
  ) {
    // Configuración del formulario reactivo
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.pattern(/^\d{9}$/)]],
    });
  }

  // Método para crear un nuevo cliente
  crearCliente() {
    if (this.clienteForm.valid) {
      const nuevoCliente: Cliente = this.clienteForm.value;
      this.clienteService.crearCliente(nuevoCliente).subscribe(
        response => {
          Swal.fire({
            title: 'Cliente creado',
            text: 'El cliente ha sido creado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.clienteForm.reset(); // Opcional: Resetea el formulario después de la creación
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear el cliente',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  // Método para redirigir al login
  irALogin() {
    this.router.navigate(['']); // Navega a la página principal (login)
  }
}
