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
