// src/app/servicios/transferencia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transferencia } from '../modelos/transferencia';

@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {
  private apiUrl = 'http://localhost:8080/api/transferencia';

  constructor(private http: HttpClient) {}

  obtenerTodasLasTransferencias(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.apiUrl);
  }

  realizarTransferencia(transferencia: Transferencia): Observable<any> {
    return this.http.post<any>(this.apiUrl, transferencia);
  }

  verificarCuentaExistente(numeroCuenta: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificarCuenta/${numeroCuenta}`);
  }

  verificarSaldo(numeroCuenta: string, monto: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificarSaldo/${numeroCuenta}/${monto}`);
  }
  obtenerTransferenciasPorCliente(
    idCliente: number
  ): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(
      `${this.apiUrl}/${idCliente}/transferencias`
    );
  }
}
