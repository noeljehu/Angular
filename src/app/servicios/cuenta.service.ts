import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuenta } from '../modelos/cuenta';
import { Transferencia } from '../modelos/transferencia';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiUrl = 'http://localhost:8080/api/cuentas';

  constructor(private http: HttpClient) { }

  realizarTransferencia(transferencia: Transferencia): Observable<any> {
    return this.http.post(`${this.apiUrl}/transferir`, transferencia);
  }

  obtenerTodasLasCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.apiUrl);
  }

  obtenerCuentaPorId(id: number): Observable<Cuenta> {
    return this.http.get<Cuenta>(`${this.apiUrl}/${id}`);
  }

  crearCuenta(clienteId: number, nuevaCuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(`${this.apiUrl}/${clienteId}`, nuevaCuenta, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
