import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferenciaService } from '../../servicios/transferencia.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit {
  transferenciaForm: FormGroup;
  cuentaOrigen: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private transferenciaService: TransferenciaService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.transferenciaForm = this.fb.group({
      cuentaDestino: ['', [Validators.required, this.cuentaDestinoValidator]],
      monto: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaOrigen = params['origen'] || '';
    });
  }

  cuentaDestinoValidator(control: AbstractControl) {
    const cuentaDestino = control.value;
    const regex = /^[0-9]{20}$/;
    return regex.test(cuentaDestino) ? null : { invalidCuentaDestino: true };
  }

  verificarCuentaYSaldo() {
    const cuentaDestino = this.transferenciaForm.value.cuentaDestino;
    const monto = this.transferenciaForm.value.monto;

    // Verificar existencia de la cuenta destino
    this.transferenciaService.verificarCuentaExistente(cuentaDestino).subscribe(
      cuentaExistente => {
        if (!cuentaExistente) {
          Swal.fire({
            title: 'Error',
            text: 'La cuenta de destino no existe.',
            icon: 'error'
          });
          return;
        }

        // Verificar saldo suficiente en la cuenta origen
        this.transferenciaService.verificarSaldo(this.cuentaOrigen, monto).subscribe(
          saldoSuficiente => {
            if (!saldoSuficiente) {
              Swal.fire({
                title: 'Error',
                text: 'Saldo insuficiente en la cuenta de origen.',
                icon: 'error'
              });
              return;
            }

            // Si ambas validaciones pasan, proceder con la transferencia
            this.realizarTransferencia();
          },
          error => {
            console.error('Error al verificar el saldo:', error);
            Swal.fire({
              title: 'Error',
              text: 'Error al verificar el saldo.',
              icon: 'error'
            });
          }
        );
      },
      error => {
        console.error('Error al verificar la cuenta:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al verificar la cuenta de destino.',
          icon: 'error'
        });
      }
    );
  }

  realizarTransferencia() {
    if (this.transferenciaForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos correctamente.',
        icon: 'error'
      });
      return;
    }

    const transferencia = {
      monto: this.transferenciaForm.value.monto,
      numeroCuentaOrigen: this.cuentaOrigen,
      numeroCuentaDestino: this.transferenciaForm.value.cuentaDestino
    };

    this.transferenciaService.realizarTransferencia(transferencia).subscribe(
      response => {
        const clienteId = sessionStorage.getItem('clienteId');
        if (clienteId) {
          this.clienteService.obtenerClientePorId(parseInt(clienteId)).subscribe(cliente => {
            sessionStorage.setItem('cliente', JSON.stringify(cliente));
          }, error => {
            console.error('Error al obtener los datos del cliente:', error);
          });
        }

        Swal.fire({
          title: 'Éxito',
          text: 'La transferencia ha sido realizada exitosamente.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/cliente']);
        });
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al realizar la transferencia.',
          icon: 'error'
        });
      }
    );
  }
  // Método para redirigir a otro componente 
  irACliente() { this.router.navigate(['/cliente']); }

  get cuentaDestino() {
    return this.transferenciaForm.get('cuentaDestino');
  }

  get monto() {
    return this.transferenciaForm.get('monto');
  }
}
