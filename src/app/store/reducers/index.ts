import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from "@angular/router";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromRouter from "@ngrx/router-store";

//State of the Router
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

//Registering the reducers of the router
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};

//Selector for the router state
export const getRouterState =
  createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
    "routerReducer"
  );

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl>
{
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    //getting properties from the router state
    //everytime we navigate to a different page, or the URL changes..
    //this function is going to get called.

    const { url } = routerState; //getting the url
    const { queryParams } = routerState.root; //getting the params from the url

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
