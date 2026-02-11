// types
import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

import { set_open_loader } from "./ui";
import type { AppDispatch } from "./state";
import { db } from "../utils/firebase_config.ts";
import notifySuccess from "../utils/notify";
import { COLLECTIONS_NAMES } from "../utils/constants.ts";
import { fromFirebaseToJs } from "../utils/dateUtils.ts";

export const pharmacy_state = {
  dataPharmacy: {},
  loadingPharmacy: false,
  lastUpdatedAt: null,
} as {
  dataPharmacy: any;
  loadingPharmacy: boolean;
  lastUpdatedAt: number | null;
};

// ==============================|| SLICE - MENU ||============================== //

const pharnacySlice = createSlice({
  name: "pharmacy",
  initialState: pharmacy_state,
  reducers: {
    all_list_pharmacy(state, { payload }: { payload: any }) {
      payload.forEach((el: any) => {
        state.dataPharmacy[el.id ?? ""] = el;
      });
      return state;
    },
    createPharmacy(state, { payload }: { payload: any }) {
      state.dataPharmacy[payload.id] = {
        ...state.dataPharmacy[payload.id],
        ...payload,
        // createdAt: fromFirebaseToJs(payload?.createdAt),
        // updatedAt: fromFirebaseToJs(payload?.updatedAt),
      };
    },
    setloadingOrders(state, { payload }) {
      state.loadingPharmacy = payload;
      return state;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdatedAt = action.payload;
    },
  },
});

export default pharnacySlice.reducer;

export const {
  all_list_pharmacy,
  createPharmacy,
  setloadingOrders,
  setLastUpdated,
} = pharnacySlice.actions;

export const create_pharmacy_async =
  (data: any, callback?: () => void, onError?: () => void) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(set_open_loader(true));
      await setDoc(doc(db, COLLECTIONS_NAMES.PHARMACY + "/" + data.id), data, {
        merge: true,
      });
      dispatch(createPharmacy(data));
      notifySuccess();
      callback?.();
    } catch (err) {
      console.log("error when create saving", err);
    } finally {
      dispatch(set_open_loader(false));
      onError?.();
    }
  };

export const list_pharmacy_async =
  (onError?: () => void) => async (dispatch: AppDispatch) => {
    try {
      // const savingList = getState().sales?.dataSale;
      // const last_fetch = savingList?.lastUpdatedAt ?? initial_last_fetch_date;
      const new_last_fetch = new Date();
      const items: any = [];
      const snapshot = await getDocs(
        query(
          collection(db, COLLECTIONS_NAMES.PHARMACY)
          // where("updatedAt", ">=", last_fetch)
        )
      );
      snapshot.forEach((doc) => {
        items.push({
          ...doc.data(),
          createdAt: fromFirebaseToJs(doc.data().createdAt),
          updatedAt: fromFirebaseToJs(doc.data().updatedAt),
        });
      });

      dispatch(all_list_pharmacy(items));

      if (items.length > 0) {
        dispatch(setLastUpdated(new_last_fetch));
      }
    } catch (err) {
      console.log("error retrieving order list", err);
    } finally {
      onError?.();
    }
  };
