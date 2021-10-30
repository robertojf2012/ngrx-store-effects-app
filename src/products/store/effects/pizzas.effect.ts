import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import * as pizzaActions from "../actions/pizzas.action";
import * as fromServices from "../../services";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzasService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    //checks if there was an action of LOAD_PIZZAS
    switchMap(() => {
      return this.pizzasService.getPizzas().pipe(
        //making the request to the service to get the pizzas
        map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)), //returning action response with the pizzas
        catchError((error) => of(new pizzaActions.LoadPizzasFail(error))) //returning action reponse with error
      );
    })
  );
}
