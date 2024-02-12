import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnDestroy{

  private mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor( private changeDetectorRef: ChangeDetectorRef,
               private media: MediaMatcher ){

    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  public sideBarItems= [
    { label: 'Inicio', icon: 'home', url:'./home' },
    { label: 'Cotizaciones', icon: 'calculate', url:'./cotizacion' }
  ]

}
