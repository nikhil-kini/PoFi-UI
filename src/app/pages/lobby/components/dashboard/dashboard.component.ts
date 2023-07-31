import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Constants } from 'src/app/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'pofri-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private router: Router){}

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Constants.MOBILE_TRANSITION).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Game Engine', cols: 2, rows: 1 },
          // { title: 'Card 2', cols: 1, rows: 1 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Game Engine', cols: 2, rows: 1 },
        // { title: 'Card 2', cols: 1, rows: 1 },
        // { title: 'Card 3', cols: 1, rows: 2 },
        // { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  createSession(){
    this.router.navigate(['/nlholdem']);
  }
}
