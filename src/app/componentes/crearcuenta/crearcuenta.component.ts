import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Para redirigir al usuario
import { CuentaService } from '../../servicios/cuenta.service';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.scss']
})
export class CrearCuentaComponent implements OnInit {
  saldo: number = 0;
  clientes: Cliente[] = []; // Para almacenar la lista de clientes

  constructor(
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private router: Router // Para la redirección
  ) {}

  ngOnInit() {
    this.obtenerClientes(); // Obtener la lista de clientes al inicializar
  }

  obtenerClientes() {
    this.clienteService.obtenerTodosLosClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  crearCuenta() {
    const clienteId = parseInt(sessionStorage.getItem('clienteId') || '0');
    if (!clienteId) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener el ID del cliente.',
        icon: 'error'
      });
      return;
    }

    const nuevaCuenta = {
      saldo: this.saldo,
      cliente: { idCliente: clienteId } as Cliente
    };

    this.cuentaService.crearCuenta(clienteId, nuevaCuenta).subscribe(response => {
      // Actualiza los datos del cliente en sessionStorage
      this.clienteService.obtenerClientePorId(clienteId).subscribe(cliente => {
        sessionStorage.setItem('clienteData', JSON.stringify(cliente));
      });

      Swal.fire({
        title: 'Éxito',
        text: 'La cuenta ha sido creada exitosamente.',
        icon: 'success'
      });

      // Redirige al perfil del cliente
      this.router.navigate(['/cliente']); // Cambia '/perfil' a la ruta de tu página de perfil

    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al crear la cuenta.',
        icon: 'error'
      });
    });
  }
  irACliente() {
    this.router.navigate(['/cliente']);
  }
  
}
