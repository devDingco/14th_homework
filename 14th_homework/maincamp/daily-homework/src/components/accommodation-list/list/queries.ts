'use client';

import { gql } from '@apollo/client';

export const FETCH_TRAVELPRODUCTS = gql`
  query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {
    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {
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
    }
  }
`;

export const DELETE_TRAVELPRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;
