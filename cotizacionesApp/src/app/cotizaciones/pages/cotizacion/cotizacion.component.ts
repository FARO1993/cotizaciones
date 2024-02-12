import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from '../../services/cotizaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, finalize } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  formulario: FormGroup;
  listaMonedas: Object[] = [];
  isLoading: boolean = false;
  resultadoCotizacion: CurrencyConvertResponse;
  mostrarResultado: boolean = false;
  mensajeError: string = 'Ha ocurrido un error'

  constructor( protected cotizacionesService: CotizacionesService,
               private fb: FormBuilder,
               private snack: SnackbarService ) { }

  ngOnInit() {
    this.findAllCurrencies();
    this.inicializarFormulario();
  }

  inicializarFormulario(): void{
    this.formulario = this.fb.group({
      campoDe: ['', Validators.required],
      campoA: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]]
    });
  }

  isButtonDisabled(): boolean {
    return this.formulario.invalid;;
  }

  findAllCurrencies() {
    this.cotizacionesService.getCurrencies().subscribe(currencies => {
      this.listaMonedas = Object.keys(currencies);
    });
  }

  calcular(): void{
    if(this.formulario.valid){
      this.isLoading = true;
      const campoDe = this.formulario.get('campoDe').value;
      const campoA = this.formulario.get('campoA').value;
      const cantidad = this.formulario.get('cantidad').value;

      this.cotizacionesService.convertCurrency(campoDe, campoA, cantidad)
      .pipe(
        delay(2000),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe( result => {
        this.mostrarResultado = true;
        this.resultadoCotizacion = result;
        this.resultadoCotizacion.ratesKey = Object.keys(result.rates);
        this.resultadoCotizacion.ratesValue =  Object.values(result.rates);
      }, err => {
        this.mostrarResultado = false;
        this.snack.openSnackBar(this.mensajeError,"","Error");
      })
    }
  }

  cancelar(): void {
  this.formulario.reset();
  this.mostrarResultado = false;
  }
}
