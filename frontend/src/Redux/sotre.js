import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Auth.reducer";
import { inventoryReducer } from "./Inventory/inventory.reducer";
import { oemReducer } from "./OEM/oem.reducer";

// TODO: use this store variable to create a store.

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer,
  oem: oemReducer,
});

// Note: you can delete the line below, but remember to create a new store variable

export const store = legacy_createStore(
  rootReducer,
  composerEnhancer(applyMiddleware(thunk))
);
