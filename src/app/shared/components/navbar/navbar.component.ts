import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() toggleSidenav = new EventEmitter<boolean>();
  isOpen: boolean = false;

  isMobile$ = this.breakpointObserver.currentScreenSize$.pipe(
    map(screenSize => {
      if (screenSize === 'XSmall' || screenSize === 'Small') {
        return true;
      } else {
        this.toggleSidenav.emit(false);
        return false;
      }
    })
  );

  constructor(private readonly breakpointObserver: BreakpointObserverService) {}

  onMenuClick(event: any) {
    this.isOpen = !this.isOpen;
    this.toggleSidenav.emit(this.isOpen);
  }
}
