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
