import { gql } from '@apollo/client';

export const FETCH_PRODUCTS = gql`
  query FetchProducts {
    fetchProducts {
      _id
      seller
      name
      detail
      price
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID) {
    deleteProduct(productId: $productId) {
      _id
      number
      message
    }
  }
`;
