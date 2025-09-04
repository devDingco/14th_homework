export const FETCH_BOARD_QUERY = `#graphql
  query FetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      images
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_BOARDS_QUERY = `#graphql
  query FetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {
      _id
      title
      contents
      writer
      createdAt
      likeCount
      dislikeCount
    }
  }
`;

export const FETCH_BOARDS_COUNT_QUERY = `#graphql
  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
  }
`;


