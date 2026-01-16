'use client';

import { gql } from '@apollo/client';

export const FETCH_TRAVELPRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      images
      pickedCount
      tags
      seller {
        _id
        name
        picture
      }
      travelproductAddress {
        _id
        address
        addressDetail
        lat
        lng
        zipcode
      }
    }
  }
`;

// 문의 목록 조회
export const FETCH_TRAVELPRODUCT_QUESTIONS = gql`
  query fetchTravelproductQuestions($travelproductId: ID!, $page: Int) {
    fetchTravelproductQuestions(travelproductId: $travelproductId, page: $page) {
      _id
      contents
      createdAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

// 답변 목록 조회
export const FETCH_TRAVELPRODUCT_QUESTION_ANSWERS = gql`
  query fetchTravelproductQuestionAnswers($travelproductQuestionId: ID!, $page: Int) {
    fetchTravelproductQuestionAnswers(
      travelproductQuestionId: $travelproductQuestionId
      page: $page
    ) {
      _id
      contents
      createdAt
      updatedAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

// 문의 등록
export const CREATE_TRAVELPRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
    $travelproductId: ID!
  ) {
    createTravelproductQuestion(
      createTravelproductQuestionInput: $createTravelproductQuestionInput
      travelproductId: $travelproductId
    ) {
      _id
      contents
      createdAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

// 문의 수정
export const UPDATE_TRAVELPRODUCT_QUESTION = gql`
  mutation updateTravelproductQuestion(
    $travelproductQuestionId: ID!
    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
  ) {
    updateTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
      updateTravelproductQuestionInput: $updateTravelproductQuestionInput
    ) {
      _id
      contents
      updatedAt
    }
  }
`;

// 문의 삭제
export const DELETE_TRAVELPRODUCT_QUESTION = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(travelproductQuestionId: $travelproductQuestionId)
  }
`;

// 답변 등록
export const CREATE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
  mutation createTravelproductQuestionAnswer(
    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
    $travelproductQuestionId: ID!
  ) {
    createTravelproductQuestionAnswer(
      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      createdAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

// 답변 수정
export const UPDATE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
  mutation updateTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!
  ) {
    updateTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput
    ) {
      _id
      contents
      updatedAt
    }
  }
`;

// 답변 삭제
export const DELETE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
  mutation deleteTravelproductQuestionAnswer($travelproductQuestionAnswerId: ID!) {
    deleteTravelproductQuestionAnswer(travelproductQuestionAnswerId: $travelproductQuestionAnswerId)
  }
`;

// 북마크 토글
export const TOGGLE_TRAVELPRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`;
