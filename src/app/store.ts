import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "@/features/assets/slices/filtersSlice";
import paginationReducer from "@/features/assets/slices/paginationSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    pagination: paginationReducer,
  },
});

// Types

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
