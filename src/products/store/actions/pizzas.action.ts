import { Action } from "@ngrx/store";
import { Pizza } from "src/products/models/pizza.model";

//ACTIONS
export const LOAD_PIZZAS = "[Products] load Pizzas";
export const LOAD_PIZZAS_FAIL = "[Products] load Pizzas Fail";
export const LOAD_PIZZAS_SUCCESS = "[Products] load Pizzas Success";

//ACTIONS CREATORS
export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

//action types
export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;
