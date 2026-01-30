import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MarketCapCategory, PriceChange } from "../types/asset";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type AssetsFiltersState = {
  search: string;
  priceChange: PriceChange;
  marketCapCategory: MarketCapCategory;
};

/* -------------------------------------------------------------------------- */
/* Initial state                                                              */
/* -------------------------------------------------------------------------- */

const initialState: AssetsFiltersState = {
  search: "",
  priceChange: "all",
  marketCapCategory: "all",
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
    setMarketCapCategory(state, action: PayloadAction<MarketCapCategory>) {
      state.marketCapCategory = action.payload;
    },
    setPriceChange(state, action: PayloadAction<PriceChange>) {
      state.priceChange = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setMarketCapCategory, setPriceChange, resetFilters } =
  assetsFiltersSlice.actions;

export default assetsFiltersSlice.reducer;
