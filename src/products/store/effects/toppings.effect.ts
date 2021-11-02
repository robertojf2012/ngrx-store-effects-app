import { Actions, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as toppingsActions from "../actions/toppings.action";
import * as fromServices from "../../services/toppings.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map((toppings) => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError((error) => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
