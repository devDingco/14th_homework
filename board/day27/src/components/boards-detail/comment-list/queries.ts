import { gql } from "@apollo/client";

export const Fetch_Board_Comments = gql`
query fetchBoardComments($boardId:ID!){
fetchBoardComments(boardId:$boardId){
    _id, writer, contents, rating, createdAt
}
}
`;