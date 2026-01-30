import { configureStore } from "@reduxjs/toolkit";

import assetsFiltersReducer from "@/features/assets/slices/assetsFiltersSlice";

export const store = configureStore({
  reducer: {
    assetsFilters: assetsFiltersReducer,
  },
});

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
