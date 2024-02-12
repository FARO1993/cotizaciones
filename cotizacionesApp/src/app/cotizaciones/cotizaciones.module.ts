import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionesRoutingModule } from './cotizaciones-routing.module';

import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SnackbarModule } from '../shared/snackbar/snackbar.module';



@NgModule({
  declarations: [
    HomeComponent,
    CotizacionComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SnackbarModule
  ]
})
export class CotizacionesModule { }
