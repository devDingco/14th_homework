import { gql } from "@apollo/client";

export const Fetch_Board_Comments = gql`
query fetchBoardComments($boardId:ID!, $page:Int){
fetchBoardComments(boardId:$boardId, page:$page){
    _id, writer, contents, rating, createdAt
}
}
`;