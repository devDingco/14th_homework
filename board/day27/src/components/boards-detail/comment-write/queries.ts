import { gql } from "@apollo/client";

export const Create_Board_Comment = gql`
    mutation CreateBoardComment($boardId:ID!, $createBoardCommentInput:CreateBoardCommentInput!){
     createBoardComment(boardId:$boardId, createBoardCommentInput:$createBoardCommentInput){
        _id, writer, contents, createdAt
    }
    }
`