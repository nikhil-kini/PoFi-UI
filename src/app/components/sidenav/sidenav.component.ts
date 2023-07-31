import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'pofri-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isDarkTheme: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Constants.MOBILE_TRANSITION)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    navLinks = [
      {path: 'home', title:'HOME'},
      {path: 'about', title: 'ABOUT'},
      {path: 'contact', title: 'CONTACT'},
    ];
}
