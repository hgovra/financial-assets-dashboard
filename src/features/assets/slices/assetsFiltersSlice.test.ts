import reducer, {
    hydrateFilters,
    setMarketCap,
    setPriceChange,
    setSearch,
    type AssetsFiltersState,
} from "./assetsFiltersSlice";

describe("assetsFiltersSlice", () => {
  const initialState = {
    search: "",
    priceChange: "all",
    marketCap: "all",
  } satisfies AssetsFiltersState;

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("sets search filter", () => {
    const state = reducer(initialState, setSearch("btc"));
    expect(state.search).toBe("btc");
  });

  it("sets price change filter", () => {
    const state = reducer(initialState, setPriceChange("gainers"));
    expect(state.priceChange).toBe("gainers");
  });

  it("sets market cap filter", () => {
    const state = reducer(initialState, setMarketCap("small"));
    expect(state.marketCap).toBe("small");
  });

  it("hydrates filters partially", () => {
    const state = reducer(initialState, hydrateFilters({ search: "eth" }));

    expect(state).toEqual({
      search: "eth",
      priceChange: "all",
      marketCap: "all",
    });
  });

  it("hydrates multiple filters at once", () => {
    const state = reducer(
      initialState,
      hydrateFilters({
        search: "btc",
        marketCap: "mid",
      }),
    );

    expect(state).toEqual({
      search: "btc",
      priceChange: "all",
      marketCap: "mid",
    });
  });
});
