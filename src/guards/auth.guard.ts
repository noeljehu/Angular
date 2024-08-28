import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    // Verifica si el usuario está autenticado
    const isAuthenticated = !!sessionStorage.getItem('cliente');
    
    if (!isAuthenticated) {
      // Redirige al usuario al login si no está autenticado
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}
