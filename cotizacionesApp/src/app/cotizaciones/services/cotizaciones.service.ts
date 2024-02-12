import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  private baseUrl: string = 'https://api.frankfurter.app';

  constructor( private http: HttpClient ) { }

  getCurrencies(): Observable<Object[]>{
    return this.http.get<any[]>(`${ this.baseUrl }/currencies`);
  }

  convertCurrency(campoDe: string, campoA:string, valor: number): Observable<CurrencyConvertResponse>{
    return this.http.get<CurrencyConvertResponse>(`${ this.baseUrl }/latest?amount=${valor}&from=${campoDe}&to=${campoA}`);
  }

}

