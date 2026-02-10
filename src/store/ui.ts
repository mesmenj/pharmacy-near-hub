// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
export const ui_state = {
  openItem: "dashboard",
  //   activeIcon: DashboardIcon,
  backdrop: false,
  defaultId: "dashboard",
  openComponent: "buttons",
  drawerOpen: false,
  drawerOpenRigthStore: false,
  componentDrawerOpen: true,

  theme_mode: "light",

  store_active_tab: "store",
  open_loader: false,
  lang: {
    systemLanguage: "fr",
    languages: [
      {
        lang: "english",
        key: "en",
      },
      {
        lang: "french",
        key: "fr",
      },
    ],
  },
};

// ==============================|| SLICE - MENU ||============================== //

const ui = createSlice({
  name: "menu",
  initialState: ui_state,
  reducers: {
    active_item(state, { payload }) {
      state.openItem = payload;
    },
    // set_active_icon(state, { payload }) {
    //   state.activeIcon = payload;
    // },
    // addAppconfig(state, { payload }) {
    //   state.app_config = payload;
    // },

    set_open_loader(state, { payload }) {
      state.open_loader = payload;
      return state;
    },
  },
});

export default ui.reducer;

export const {
  active_item,

  set_open_loader,
} = ui.actions;

// export const loadLanguage = () => async (dispatch: any) => {
//   try {
//     const storedLanguage = (await localforage.getItem("LANG")) as string;
//     const language = storedLanguage || navigator.language.split("-")[0] || "en";
//     i18n.changeLanguage(language);
//     dispatch(set_language(language));
//   } catch (error) {
//     console.log("Load language error", error);
//   }
// };
