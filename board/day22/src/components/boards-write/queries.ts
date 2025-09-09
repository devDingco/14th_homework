import { gql } from "@apollo/client";

export const mygraphql = gql`
mutation createBoard($writer: String!, $password: String!, $title: String!, $contents: String!){
    createBoard( createBoardInput:{writer: $writer, password: $password, title:$title, contents: $contents }){
        _id, title, contents, likeCount, dislikeCount
    }
}
`;

export const mygraphUpdateql = gql`
    mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!){
        updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput)
    {
        _id, title, writer, contents
    }
    }
`;