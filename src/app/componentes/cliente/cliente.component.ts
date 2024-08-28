import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelos/cliente';
import { AuthService } from '../../servicios/auth.service';
import { ClienteService } from '../../servicios/cliente.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  // Almacena los datos del cliente cargado desde el servidor.
  cliente: Cliente | null = null;

  // Nueva propiedad: número de transferencias por página para la paginación.
  transferenciasPorPagina = 5;

  // Nueva propiedad: para seguir la página actual que se está mostrando.
  paginaActual = 1;

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCliente(); // Cargar datos del cliente al inicializar el componente.
  }

  cargarCliente() {
    const clienteId = sessionStorage.getItem('clienteId'); // Obtener el ID del cliente del sessionStorage.
    if (clienteId) {
      this.clienteService.obtenerClientePorId(parseInt(clienteId)).subscribe(
        (cliente) => {
          this.cliente = cliente; // Asignar el cliente obtenido a la propiedad `cliente`.
          sessionStorage.setItem('cliente', JSON.stringify(cliente)); // Actualizar sessionStorage con los datos del cliente.
        },
        (error) => {
          console.error('Error al obtener los datos del cliente:', error);
          this.router.navigate(['']); // Redirigir al login si ocurre un error.
        }
      );
    } else {
      console.error('No hay ID de cliente en sessionStorage');
      this.router.navigate(['']); // Redirigir al login si no hay ID en sessionStorage.
    }
  }

  // Nuevo getter: Devuelve solo las transferencias que corresponden a la página actual.
  get transferenciasPaginadas() {
    if (this.cliente) {
      // Calcular el índice inicial y final para las transferencias de la página actual.
      const inicio = (this.paginaActual - 1) * this.transferenciasPorPagina;
      const fin = inicio + this.transferenciasPorPagina;
      return this.cliente.transferencias.slice(inicio, fin); // Retornar las transferencias paginadas.
    }
    return [];
  }

  // Nuevo getter: Calcula el número total de páginas basado en el número de transferencias.
  get totalPaginas() {
    return this.cliente ? Math.ceil(this.cliente.transferencias.length / this.transferenciasPorPagina) : 0;
  }

  // Nuevo método: Cambia la página actual según el botón de paginación que se presione.
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  onLogout() {
    this.authService.logout(); // Lógica para cerrar sesión.
    this.router.navigate(['']); // Redirigir al login después de cerrar sesión.
  }

  crearCuenta() {
    this.router.navigate(['/crearcuenta']); // Redirigir a la página de crear cuenta.
  }

  iniciarTransferencia(numeroCuentaOrigen: string) {
    this.router.navigate(['/realizartransferencia'], {
      queryParams: { origen: numeroCuentaOrigen }, // Redirigir a la página de transferencia con el número de cuenta como parámetro.
    });
  }
}

