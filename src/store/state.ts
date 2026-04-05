import { persistReducer, persistStore } from "redux-persist";
import localforage from "localforage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import uiReducer, { ui_state } from "./ui";
import pharmacyReducer, { pharmacy_state } from "./pharmacy";
import guardReducer, { guard_state } from "./guard";

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const persistConfig = {
  key: "pharmacy-near-web",
  storage: localforage,
  blackList: ["ui", "guard"],
};

const initialState = {
  ui: ui_state,
  pharmacy: pharmacy_state,
  guard: guard_state,

  //   sales: sale_state,
};

const reducers = combineReducers({
  ui: uiReducer,
  pharmacy: pharmacyReducer,
  guard: guardReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGGED_OUT") {
    return { ...initialState };
  }
  return reducers(state, action);
};
const persistReducers = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: persistReducers,
  //   devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type STATE = typeof initialState;
export type AppDispatch = typeof store.dispatch;
export type GET_STATE = () => STATE;

export default persistStore(store);
