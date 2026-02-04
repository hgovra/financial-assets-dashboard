import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import { useAssetsQuery } from "@/features/assets/hooks/useAssetsQuery";
import { store } from "@/store";
import type { UseQueryResult } from "@tanstack/react-query";
import AssetsPage from "./AssetsPage";

const mockedUseAssetsQuery = vi.mocked(useAssetsQuery);

vi.mock("@/features/assets/hooks/useAssetsQuery", () => ({
  useAssetsQuery: vi.fn(),
}));

// Helper function

function mockQueryResult<T>(data: T): UseQueryResult<T, Error> {
  return {
    data,
    isLoading: false,
    isError: false,
    error: null,
  } as UseQueryResult<T, Error>;
}

describe("AssetsPage integration", () => {
  it("filters assets when search input is used", async () => {
    const mockedAssets = [
      {
        id: "btc",
        name: "Bitcoin",
        symbol: "btc",
        price: 50_000,
        priceChange24h: 2,
        marketCap: 800_000_000_000,
        imageUrl: "",
      },
      {
        id: "eth",
        name: "Ethereum",
        symbol: "eth",
        price: 3_000,
        priceChange24h: -1,
        marketCap: 400_000_000_000,
        imageUrl: "",
      },
    ];

    mockedUseAssetsQuery.mockReturnValue(mockQueryResult(mockedAssets));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AssetsPage />
        </MemoryRouter>
      </Provider>,
    );

    // sanity check: both assets are rendered initially
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();

    // act: type in search filter
    const searchInput = screen.getByRole("textbox", { name: /search/i });
    await userEvent.type(searchInput, "bit");

    // assert: only Bitcoin remains
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.queryByText("Ethereum")).not.toBeInTheDocument();
  });
});
