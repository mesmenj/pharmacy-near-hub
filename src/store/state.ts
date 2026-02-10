import { persistReducer, persistStore } from "redux-persist";
import localforage from "localforage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import uiReducer, { ui_state } from "./ui";

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const persistConfig = {
  key: "pharmacy-near-web",
  storage: localforage,
  blackList: ["ui"],
};

const initialState = {
  ui: ui_state,

  //   sales: sale_state,
};

const reducers = combineReducers({
  ui: uiReducer,
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
