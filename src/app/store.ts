import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "@/features/assets/slices/assetsFiltersSlice";
import paginationReducer from "@/features/assets/slices/paginationSlice";

export const store = configureStore({
  reducer: {
    assetsFilters: filtersReducer,
    pagination: paginationReducer,
  },
});

// Types

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
