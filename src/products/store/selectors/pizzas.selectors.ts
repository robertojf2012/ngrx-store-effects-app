import { createSelector } from "@ngrx/store";
import { Pizza } from "src/products/models/pizza.model";
import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromPizzasReducer from "../reducers/pizzas.reducer";
import * as fromToppingsSelectors from "./toppings.selectors";

//Selector for the pizza state
export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
); // Ej. products.pizzas

//Selector for the pizzas entities
export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzasReducer.getPizzasEntities //returns the big object with the pizzas objects inside
); // Ej. products.pizzas.entities

//Selector for an specific pizza entity
export const getSelectedPizza = createSelector(
  getPizzasEntities, //getting all the pizzas entities
  fromRoot.getRouterState, //using the router state created at the app
  (entities, router): Pizza => {
    //returning the current state and the pizza entity matching the id
    //provided from the router state
    return router.state && entities[router.state.params.pizzaId];
  }
);

//Selector for displaying the pizza selected
export const getPizzaVisualised = createSelector(
  getSelectedPizza, //calling the selector for knowing which pizza was selected
  fromToppingsSelectors.getToppingEntities, //selecting all the topping entities
  fromToppingsSelectors.getSelectedToppings, //selecting the selected toppings
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map((id) => toppingEntities[id]); //getting the array of toppings
    return {
      ...pizza,
      toppings,
    };
  }
);

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
