import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cotizacionApp',
    loadChildren: () => import('./cotizaciones/cotizaciones.module').then( m => m.CotizacionesModule)
  },
  {
    path: '**',
    redirectTo: 'cotizacionApp'
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
