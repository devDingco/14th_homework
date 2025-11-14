import { graphql } from "@/commons/graphql/gql";

export const FETCH_TRAVELPRODUCT = graphql(`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      pickedCount
      images
      tags
      travelproductAddress {
        _id
        address
        addressDetail
        zipcode
        lat
        lng
      }
      seller {
        _id
        name
        picture
      }
      buyer {
        _id
        name
        picture
      }
      createdAt
      updatedAt
      soldAt
      deletedAt
    }
  }
`);

