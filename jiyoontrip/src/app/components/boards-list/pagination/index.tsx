"use client";

import { gql, useQuery } from "@apollo/client";

const FERTCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export default function PaginationComponent() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FERTCH_BOARDS_COUNT);
  const onClickPage = () => {};
  return (
    <>
      <div>
        {new Array(10).fill("지윤").map((_, index) => (
          <button key={index + 1} onClick={onClickPage}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
