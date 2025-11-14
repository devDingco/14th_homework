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
