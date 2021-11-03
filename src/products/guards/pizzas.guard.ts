import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { catchError, filter, switchMap, take, tap } from "rxjs/operators";
import * as fromStore from "../store";

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          //if the pizzas are not loaded, we dispatch the action to load
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter((loaded) => loaded), // this just basically waits for the loaded property to be true to continue the stream
      take(1)
    );
  }
}
