import { gql } from '@apollo/client';

export const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      images
      tags
      travelproductAddress {
        _id
        zipcode
        address
        addressDetail
        lat
        lng
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TRAVELPRODUCT = gql`
  mutation updateTravelproduct(
    $travelproductId: ID!
    $updateTravelproductInput: UpdateTravelproductInput!
  ) {
    updateTravelproduct(
      travelproductId: $travelproductId
      updateTravelproductInput: $updateTravelproductInput
    ) {
      _id
      name
      remarks
      contents
      price
      images
      tags
      travelproductAddress {
        _id
        zipcode
        address
        addressDetail
        lat
        lng
      }
      updatedAt
    }
  }
`;
