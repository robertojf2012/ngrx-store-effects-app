import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import * as fromPizzasReducer from "./pizzas.reducer";

//This is like the global state, which contains our (pizzas) state
export interface ProductsState {
  pizzas: fromPizzasReducer.PizzaState;
}

//Registering all the reducers of our global state.
//this constant is then registered in the products.module with the feature name "products"
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzasReducer.reducer,
};

//::::::::::::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::: SELECTORS ::::::::::::::::::::://
//::::::::::::::::::::::::::::::::::::::::::::::::::::://

//Selector for the global state products
export const getProductsState =
  createFeatureSelector<ProductsState>("products"); //the "products" is the one registered in the products.module file

//Selector for the pizza state
export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
); // Ej. products.pizzas

//Selector for the pizzas entities
export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzasReducer.getPizzasEntities //returns the big object with the pizzas objects inside
); // Ej. products.pizzas.entities

//Selector for the pizzas array
export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  //gets the pizza objects inside the big object and return the array of pizzas.
  return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
}); // Ej. products.pizzas.entities => [{}, {}, ...]

//Selector for the loaded property of the pizza state
export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzasReducer.getPizzasLoaded
); // Ej. products.pizzas.loaded

//Selector for the loading property of the pizza state
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzasReducer.getPizzasLoading
); // Ej. products.pizzas.loading
