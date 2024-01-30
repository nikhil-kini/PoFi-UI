import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Constants } from './commons/constants/constants';

@Component({
  selector: 'pofri-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokerfriend-UI';
  private breakpointObserver = inject(BreakpointObserver);
  isDarkTheme: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Constants.MOBILE_TRANSITION)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  navLinks = [
    { path: 'home', title: 'HOME' },
    { path: 'about', title: 'ABOUT' },
    { path: 'contact', title: 'CONTACT' },
  ];
}
