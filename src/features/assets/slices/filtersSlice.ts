import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { MarketCap, PriceChange } from "../types/asset";

// Types

export type AssetsFiltersState = {
  search: string;
  priceChange: PriceChange;
  marketCap: MarketCap;
};

// Initial state

const initialState: AssetsFiltersState = {
  search: "",
  priceChange: "all",
  marketCap: "all",
};

// Slice

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    hydrateFilters(state, action: PayloadAction<Partial<AssetsFiltersState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setMarketCap(state, action: PayloadAction<MarketCap>) {
      state.marketCap = action.payload;
    },
    setPriceChange(state, action: PayloadAction<PriceChange>) {
      state.priceChange = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  hydrateFilters,
  setSearch,
  setMarketCap,
  setPriceChange,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
