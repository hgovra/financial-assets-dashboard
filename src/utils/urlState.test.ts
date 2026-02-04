import { filtersToSearchParams, paginationToSearchParams } from "./urlState";

import type { AssetsFiltersState } from "@/features/assets/slices/assetsFiltersSlice";
import type { PaginationState } from "@/features/assets/slices/paginationSlice";

describe("filtersToSearchParams", () => {
  it("returns empty search params when all filters are default", () => {
    const filters: AssetsFiltersState = {
      search: "",
      priceChange: "all",
      marketCap: "all",
    };

    const params = filtersToSearchParams(filters);

    expect(params.toString()).toBe("");
  });

  it("serializes search filter when provided", () => {
    const filters: AssetsFiltersState = {
      search: "eth",
      priceChange: "all",
      marketCap: "all",
    };

    const params = filtersToSearchParams(filters);

    expect(params.get("search")).toBe("eth");
    expect(params.toString()).toBe("search=eth");
  });

  it("serializes non-default priceChange filter", () => {
    const filters: AssetsFiltersState = {
      search: "",
      priceChange: "gainers",
      marketCap: "all",
    };

    const params = filtersToSearchParams(filters);

    expect(params.get("priceChange")).toBe("gainers");
  });

  it("serializes non-default marketCap filter", () => {
    const filters: AssetsFiltersState = {
      search: "",
      priceChange: "all",
      marketCap: "small",
    };

    const params = filtersToSearchParams(filters);

    expect(params.get("marketCap")).toBe("small");
  });

  it("serializes multiple filters together", () => {
    const filters: AssetsFiltersState = {
      search: "btc",
      priceChange: "losers",
      marketCap: "mid",
    };

    const params = filtersToSearchParams(filters);

    expect(params.get("search")).toBe("btc");
    expect(params.get("priceChange")).toBe("losers");
    expect(params.get("marketCap")).toBe("mid");

    // Order-independent assertion
    expect(params.toString()).toContain("search=btc");
    expect(params.toString()).toContain("priceChange=losers");
    expect(params.toString()).toContain("marketCap=mid");
  });
});

describe("paginationToSearchParams", () => {
  it("does not add page param when currentPage is 1", () => {
    const pagination: PaginationState = {
      currentPage: 1,
      pageSize: 10,
    };

    const params = new URLSearchParams();

    paginationToSearchParams(pagination, params);

    expect(params.get("page")).toBeNull();
    expect(params.toString()).toBe("");
  });

  it("adds page param when currentPage is greater than 1", () => {
    const pagination: PaginationState = {
      currentPage: 3,
      pageSize: 10,
    };

    const params = new URLSearchParams();

    paginationToSearchParams(pagination, params);

    expect(params.get("page")).toBe("3");
    expect(params.toString()).toBe("page=3");
  });

  it("appends page param to existing search params", () => {
    const pagination: PaginationState = {
      currentPage: 2,
      pageSize: 10,
    };

    const params = new URLSearchParams("search=eth&marketCap=small");

    paginationToSearchParams(pagination, params);

    expect(params.get("search")).toBe("eth");
    expect(params.get("marketCap")).toBe("small");
    expect(params.get("page")).toBe("2");
  });
});
