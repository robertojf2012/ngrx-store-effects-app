import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromPizzasReducer from "./pizzas.reducer";
import * as fromToppingsReducer from "./toppings.reducer";

//This is like the global state, which contains our (pizzas) state
export interface ProductsState {
  pizzas: fromPizzasReducer.PizzaState;
  toppings: fromToppingsReducer.ToppingsState;
}

//Registering all the reducers of our global state.
//this constant is then registered in the products.module with the feature name "products"
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzasReducer.reducer,
  toppings: fromToppingsReducer.reducer,
};

//Selector for the global state products
export const getProductsState =
  createFeatureSelector<ProductsState>("products"); //the "products" is the one registered in the products.module file
