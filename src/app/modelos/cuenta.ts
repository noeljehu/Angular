
import { Cliente } from './cliente'; // Asegúrate de tener una interfaz Cliente definida

export interface Cuenta {
  id?: number; // Agrega un id opcional si es necesario para manejar el identificador único de la cuenta
  numeroCuenta?: string;
  saldo: number;
  fechaCreacion?: Date; // Incluye la fecha de creación si es parte del modelo
  cliente: Cliente; // Cliente asociado
}
