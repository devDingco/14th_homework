import { NEXT_PUBLIC_GRAPHQL_ENDPOINT as ENDPOINT } from "../env";
import type { BoardDetail } from "@/_types/board";
import { FETCH_BOARD_QUERY, FETCH_BOARDS_COUNT_QUERY, FETCH_BOARDS_QUERY } from "../graphql/queries/board";

export async function fetchBoardSSR(boardId: string): Promise<BoardDetail | null> {
  const query = FETCH_BOARD_QUERY;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { boardId } }),
    // ensure SSR fetch isn't cached incorrectly
    cache: "no-store",
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data?.data?.fetchBoard ?? null;
}

export interface FetchBoardsParams {
  page?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export async function fetchBoardsSSR(params: FetchBoardsParams) {
  const query = FETCH_BOARDS_QUERY;
  const variables = {
    page: params.page,
    search: params.search,
    startDate: params.startDate,
    endDate: params.endDate,
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!response.ok) return [];
  const data = await response.json();
  return data?.data?.fetchBoards ?? [];
}

export async function fetchBoardsCountSSR(params: Omit<FetchBoardsParams, "page">) {
  const query = FETCH_BOARDS_COUNT_QUERY;
  const variables = {
    search: params.search,
    startDate: params.startDate,
    endDate: params.endDate,
  };
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!response.ok) return 0;
  const data = await response.json();
  return data?.data?.fetchBoardsCount ?? 0;
}


