import { NEXT_PUBLIC_GRAPHQL_ENDPOINT as ENDPOINT } from "../env";
import type { BoardDetail } from "@/_types/board";
import { FETCH_BOARD_QUERY } from "../graphql/queries/board";

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


