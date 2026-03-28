// types
import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import type { AppDispatch } from "./state.ts";
import { BASE_URL } from "../utils/firebase_config.ts";

import type { GuardModel } from "../models/guardModel.ts";

export const guard_state = {
  dataGuard: {},
  loadingGuard: false,
  lastUpdatedAt: null,
} as {
  dataGuard: Record<any, GuardModel>;
  loadingGuard: boolean;
  lastUpdatedAt: number | null;
};

// ==============================|| SLICE - MENU ||============================== //

const guardcySlice = createSlice({
  name: "guard",
  initialState: guard_state,
  reducers: {
    createGuard(state, { payload }: { payload: GuardModel | any }) {
      state.dataGuard[payload.id] = {
        ...state.dataGuard[payload.id],
        ...payload,
        // createdAt: fromFirebaseToJs(payload?.createdAt),
        // updatedAt: fromFirebaseToJs(payload?.updatedAt),
      };
    },
    setloadingGuard(state, { payload }) {
      state.loadingGuard = payload;
      return state;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdatedAt = action.payload;
    },
  },
});

export default guardcySlice.reducer;

export const { createGuard, setloadingGuard, setLastUpdated } =
  guardcySlice.actions;

export const current_guard_async =
  (onError?: (message?: string) => void) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/current-guard`);

      const result = response.data;
      //   console.log("dataGuard", result.data);

      if (result?.status !== "SUCCESS") {
        onError?.(result?.message || "Aucune garde aujourd'hui");
        return;
      }
      dispatch(createGuard(result.data));
    } catch (err) {
      console.log("error retrieving guard list", err);
    } finally {
      onError?.();
    }
  };
