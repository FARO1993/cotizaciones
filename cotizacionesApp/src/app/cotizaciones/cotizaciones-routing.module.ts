import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';


const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'cotizacion',
        component: CotizacionComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class CotizacionesRoutingModule { }
