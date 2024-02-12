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
  currencieList: Object[] = [];
  isLoading: boolean = false;
  cotizacionResult: CurrencyConvertResponse;
  ratesResponse: number;
  mostrarResultado: boolean = false;
  durationInSeconds: 2;
  message: string = 'Ha ocurrido un error'

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
      this.currencieList = Object.keys(currencies);
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
          this.mostrarResultado = true;
          this.isLoading = false;
        })
      )
      .subscribe( result => {
        this.cotizacionResult = result;
        this.cotizacionResult.ratesKey = Object.keys(result.rates);
        this.cotizacionResult.ratesValue =  Object.values(result.rates);
      }, err => {
        this.snack.openSnackBar(this.message,"","Error");
      })
    }
  }

  cancelar(): void {
  this.formulario.reset();
  this.mostrarResultado = false;
  }
}
