import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnDestroy {
  sideBarItems = [
    { label: 'Inicio', icon: 'home', url: './home' },
    { label: 'Cotizaciones', icon: 'calculate', url: './cotizacion' }
  ];

  private mobileQuery: MediaQueryList;
  private _mobileQueryListener: (ev: MediaQueryListEvent) => any;


  constructor( private changeDetectorRef: ChangeDetectorRef,
               private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 890px)');
    this._mobileQueryListener = (ev: MediaQueryListEvent) => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
