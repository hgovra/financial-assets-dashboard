import reducer, {
    resetPagination,
    setPage,
    setPageSize,
    type PaginationState,
} from "./paginationSlice";

describe("paginationSlice", () => {
  const initialState = {
    currentPage: 1,
    pageSize: 10,
  } satisfies PaginationState;

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("sets the current page", () => {
    const state = reducer(initialState, setPage(3));
    expect(state.currentPage).toBe(3);
  });

  it("resets page when page size changes", () => {
    const state = reducer({ currentPage: 4, pageSize: 10 }, setPageSize(20));

    expect(state.pageSize).toBe(20);
    expect(state.currentPage).toBe(1);
  });

  it("resets pagination", () => {
    const state = reducer({ currentPage: 5, pageSize: 10 }, resetPagination());

    expect(state.currentPage).toBe(1);
  });
});
