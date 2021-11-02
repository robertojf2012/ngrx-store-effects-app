import { createSelector } from "@ngrx/store";
import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromToppingsReducer from "../reducers/toppings.reducer";

//Selector for the toppings state
export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
); // Ej. products.toppings

//Selector for the topping entities
export const getToppingEntities = createSelector(
  getToppingsState,
  fromToppingsReducer.getToppingsEntities //returns the big object with the toppings objects inside
); // Ej. products.toppings.entities

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppingsReducer.getSelectedToppings
); // Ej. products.toppings.selectedToppings

//Selector for the toppings array
export const getAllToppings = createSelector(getToppingEntities, (entities) => {
  //gets the topping objects inside the big object and return the array of toppings.
  return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
}); // Ej. products.toppings.entities => [{}, {}, ...]

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppingsReducer.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppingsReducer.getToppingsLoading
);
