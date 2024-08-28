import { Cuenta } from "./cuenta";
import { Transferencia } from "./transferencia";

export interface Cliente {
  
  idCliente: number;
  nombre: string;
  email: string;
  telefono: string;
  user: string;
  password: string;
  fechaRegistro: Date;
  cuentas: Cuenta[]; // Relación con múltiples cuentas
  transferencias: Transferencia[]; 
}
