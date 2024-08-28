import { Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { CrearClienteComponent } from './componentes/crear-cliente/crear-cliente.component';
import { CrearCuentaComponent } from './componentes/crearcuenta/crearcuenta.component';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'crearCliente', component: CrearClienteComponent },
  { path: 'crearcuenta', component: CrearCuentaComponent, canActivate: [AuthGuard] },
  { path: 'realizartransferencia', component: TransferenciaComponent, canActivate: [AuthGuard] },
  
];
