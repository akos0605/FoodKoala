import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  private displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  currentScreenSize$ = this.breakpointObserver
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ])
    .pipe(
      map(state => {
        for (const query of Object.keys(state.breakpoints)) {
          if (state.breakpoints[query]) {
            return this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
        return 'Unknown';
      })
    );
}
