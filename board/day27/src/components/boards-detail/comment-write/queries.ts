import { gql } from "@apollo/client";

export const Create_Board_Comment = gql`
    mutation CreateBoardComment($boardId:ID!, $createBoardCommentInput:CreateBoardCommentInput!){
     createBoardComment(boardId:$boardId, createBoardCommentInput:$createBoardCommentInput){
        _id, writer, contents, createdAt
    }
    }
`

export const Update_Board_Comment = gql`
    mutation UpdateBoardComment($boardCommentId:ID!, $password: String, $updateBoardCommentInput:UpdateBoardCommentInput!){
    updateBoardComment(boardCommentId:$boardCommentId, password: $password, updateBoardCommentInput:$updateBoardCommentInput){
       _id, writer,createdAt, contents,rating
    }
    }
`