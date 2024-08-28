import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';  // Importación de importProvidersFrom

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    
    // Usando importProvidersFrom para importar los módulos CommonModule y ReactiveFormsModule
    importProvidersFrom(CommonModule),
    importProvidersFrom(ReactiveFormsModule),
  ],
};
