import { Pizza } from "src/products/models/pizza.model";
import * as fromPizzasAction from "../actions/pizzas.action";

export interface PizzaState {
  entities: { [id: number]: Pizza }; //Object holding objects of pizzas, which can be looked up by id
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

//Function REDUCER
export function reducer(
  state = initialState,
  action: fromPizzasAction.PizzasAction //the action passed can be either LOAD_PIZZAS | LOAD_PIZZAS_FAIL | LOAD_PIZZAS_SUCCESS
): PizzaState {
  switch (action.type) {
    case fromPizzasAction.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromPizzasAction.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload; //getting the array of pizzas, this data is retrivered from the effects

      //Converting each pizza to objects like this:
      /*
        1: {
          id: number; //the key is the same as this id
          name: string;
          toppings: Topping[];
        },
        2: {
          id: number; //the key is the same as this id
          name: string;
          toppings: Topping[];
        }
        //this is for optimization and look for pizzas faster!
      */
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza,
          };
        },
        {
          ...state.entities, //Initial state
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromPizzasAction.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromPizzasAction.UPDATE_PIZZA_SUCCESS:
    case fromPizzasAction.CREATE_PIZZA_SUCCESS: {
      //Getting the pizza that was created or updated
      const pizza = action.payload;

      //Merging the current entities with the new one
      const entities = {
        ...state.entities,
        [pizza.id]: pizza,
      };

      //Returning the state with the new entities object
      return {
        ...state,
        entities,
      };
    }

    case fromPizzasAction.DELETE_PIZZA_SUCCESS: {
      //Getting the pizza that was deleted
      const pizza = action.payload;

      //We reference the pizza that we don't want to include as a first parameter
      //then the second parameter indicates the remaining entities we want to keep
      const { [pizza.id]: deleted, ...entities } = state.entities;
      // const { pizzaToDelete, ...remanining } = state.entities;

      return {
        ...state,
        entities,
      };
    }
  }

  return state;
}

//Methods for getting the properties of a pizza state
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
