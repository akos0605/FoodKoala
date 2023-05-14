import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { Observable, Subscription, fromEvent, map, merge, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  isOnline$ = merge(
    of(null),
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(map(() => navigator.onLine));

  constructor() {}
}
