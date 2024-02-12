import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: string, snackType?: any) {
    const snackClass: string =
    snackType == 'Success' ? "success-snackbar" :
    snackType == 'Error' ? "error-snackbar" :
    snackType == "Warn" ? "warn-snackbar" :
    snackType == "Info" ? "info-snackbar" : "";
    const _snackType: any =
      snackType !== undefined ? snackType : 'Success';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [snackClass],
      data: { message: message, snackType: _snackType }
    });
  }
}
