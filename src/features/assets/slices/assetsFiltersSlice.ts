import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { MarketCap, PriceChange } from "../types/asset";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type AssetsFiltersState = {
  search: string;
  priceChange: PriceChange;
  marketCap: MarketCap;
};

/* -------------------------------------------------------------------------- */
/* Initial state                                                              */
/* -------------------------------------------------------------------------- */

const initialState: AssetsFiltersState = {
  search: "",
  priceChange: "all",
  marketCap: "all",
};

/* -------------------------------------------------------------------------- */
/* Slice                                                                      */
/* -------------------------------------------------------------------------- */

const assetsFiltersSlice = createSlice({
  name: "assetsFilters",
  initialState,
  reducers: {
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
    hydrateFilters(state, action: PayloadAction<Partial<AssetsFiltersState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setSearch,
  setMarketCap,
  setPriceChange,
  resetFilters,
  hydrateFilters,
} = assetsFiltersSlice.actions;

export default assetsFiltersSlice.reducer;
