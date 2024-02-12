import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarService } from './snackbar.service';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SnackbarComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  providers: [
    SnackbarService
  ],
})
export class SnackbarModule { }
