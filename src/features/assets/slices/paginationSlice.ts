import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Types

export type PaginationState = {
  currentPage: number;
  pageSize: number;
};

// Initial state

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 10,
};

// Slice

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.currentPage = 1; // intentional reset
    },
    resetPagination(state) {
      state.currentPage = 1;
    },
  },
});

export const { setPage, setPageSize, resetPagination } =
  paginationSlice.actions;

export default paginationSlice.reducer;
