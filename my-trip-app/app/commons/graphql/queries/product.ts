import { gql } from '@apollo/client';

export const FETCH_TRAVELPRODUCTS_QUERY = gql`
  query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {
    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {
      _id
      name
      contents
      price
      images
      pickedCount
      tags
      seller {
        _id
        name
      }
      travelproductAddress {
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

export const FETCH_TRAVELPRODUCTS_OF_THE_BEST_QUERY = gql`
  query fetchTravelproductsOfTheBest {
    fetchTravelproductsOfTheBest {
      _id
      name
      contents
      price
      images
      pickedCount
      tags
      seller {
        _id
        name
      }
      travelproductAddress {
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

export const FETCH_TRAVELPRODUCT_QUERY = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      contents
      price
      images
      pickedCount
      tags
      remarks
      seller {
        _id
        name
      }
      buyer {
        _id
        name
      }
      travelproductAddress {
        address
        addressDetail
        lat
        lng
      }
      createdAt
      updatedAt
      soldAt
    }
  }
`;

