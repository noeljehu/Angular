import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from '../modelos/cliente';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/clientes';
  private cliente: Cliente | null = null;
  loggedIn$: any;

  constructor(private http: HttpClient, private router: Router) {}

 // login(user: string, password: string): Observable<Cliente> {
   // return this.http.post<Cliente>(`${this.apiUrl}/login`, { user, password }).pipe(
     // tap(cliente => {
      //  this.cliente = cliente;
      //  localStorage.setItem('cliente', JSON.stringify(cliente)); // Guarda el cliente y sus cuentas en localStorage
         // Guarda solo el ID del cliente en localStorage

  //    })
  //  );
 // }
 login(user: string, password: string): Observable<Cliente> {
  return this.http.post<Cliente>(`${this.apiUrl}/login`, { user, password }).pipe(
    tap(cliente => {
      console.log('Cliente recibido del backend:', cliente);
      if (cliente && cliente.idCliente) {  // Ajusta aquí para idCliente
        this.cliente = cliente;
        sessionStorage.setItem('cliente', JSON.stringify(cliente));
        sessionStorage.setItem('clienteId', cliente.idCliente.toString()); // Usa idCliente
      } else {
        console.error('Cliente o ID del cliente no recibido del backend');
      }
    }),
    catchError(error => {
      console.error('Error al iniciar sesión:', error);
      return throwError(() => new Error('Error al iniciar sesión'));
    })
  );
}



  getCliente(): Cliente | null {
    if (!this.cliente) {
      const storedCliente = localStorage.getItem('cliente');
      this.cliente = storedCliente ? JSON.parse(storedCliente) : null;
    }
    return this.cliente;
  }

  logout() {
    // Aquí se limpia la información de sesión
    this.cliente = null;
    sessionStorage.removeItem('cliente'); // Elimina el cliente de sessionStorage
    sessionStorage.removeItem('clienteId'); // Elimina el ID del cliente de sessionStorage
    this.router.navigate(['/']); // Redirige a la página de login
  }
}
