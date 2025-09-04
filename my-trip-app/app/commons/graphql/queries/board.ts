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


