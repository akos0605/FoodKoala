import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  groupBy,
  mergeMap,
  reduce,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { CartItem } from 'src/app/data/types/cart-item.model';

type DbKey = keyof CartItem;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly db: NgxIndexedDBService) {}

  private storeName = 'cart';

  private cartActionSubject = new BehaviorSubject<any>(null);
  cart$ = this.cartActionSubject.pipe(
    switchMap((_: any) => this.db.getAll(this.storeName) as Observable<CartItem[]>),
  );

  private notifyCartChange = <T>(source: Observable<T>) =>
    source.pipe(
      tap(() => this.cartActionSubject.next(null)),
    );

  addItem = (item: CartItem) =>
    this.db.getByIndex(this.storeName, 'productId', item.productId).pipe(
      switchMap((cartItem: any) => {
        if (cartItem) {
          cartItem.quantity += item.quantity;
          return this.db.update(this.storeName, cartItem);
        }
        return this.db.add(this.storeName, item);
      }),
      this.notifyCartChange
    );

  removeItem = (item: CartItem) =>
    this.db.deleteByKey(this.storeName, item.id!).pipe(this.notifyCartChange);

  updateItem = (item: CartItem) =>
    this.db.update(this.storeName, item).pipe(this.notifyCartChange);

  clear = () => this.db.clear(this.storeName);
}
