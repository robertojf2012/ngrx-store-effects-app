import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import { Pizza } from "../models/pizza.model";
import * as fromStore from "../store";

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId, 10);
        return this.hasPizza(id);
      })
    );
  }

  //This checks if the pizza exists in the store as an entity
  hasPizza(id: number): Observable<boolean> {
    //returns all the pizza entities
    return this.store.select(fromStore.getPizzasEntities).pipe(
      //looks for the pizza entity matching the id
      // the !!entities[id] makes return a boolean
      //if the entity exists.. returns true, otherwise false
      map((entities: { [key: number]: Pizza }) => !!entities[id]),
      take(1)
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
