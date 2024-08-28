export interface Transferencia {
  idTransferencia?: number; // Opcional si el backend lo genera automáticamente
  monto: number;
  numeroCuentaOrigen: string;
  numeroCuentaDestino: string;
  fechaTransferencia?: string; // Asegúrate de que este campo esté incluido
}
