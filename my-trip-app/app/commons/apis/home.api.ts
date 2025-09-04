"use client";

import { FETCH_BOARDS_OF_THE_BEST_QUERY } from "../graphql/queries/home";
import { apolloClient } from "../graphql/apollo-client";

export async function fetchBoardsOfTheBestApi() {
  const { data } = await apolloClient.query({
    query: FETCH_BOARDS_OF_THE_BEST_QUERY,
  });
  return data?.fetchBoardsOfTheBest ?? null;
}