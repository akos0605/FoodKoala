import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { NetworkStatusService } from 'src/app/core/services/network-status.service';

@Injectable({
  providedIn: 'root',
})
export class OnlineGuard implements CanActivate {
  constructor(private readonly networkStatus: NetworkStatusService,private readonly router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.networkStatus.isOnline$.pipe( tap(isOnline => {
      if (!isOnline) {
        this.router.navigateByUrl('/not-found');
      }
    }));
  }
}
