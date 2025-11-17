import { graphql } from "@/commons/graphql/gql";

export const FETCH_TRAVELPRODUCTS_OF_THE_BEST = graphql(`
  query fetchTravelproductsOfTheBest {
    fetchTravelproductsOfTheBest {
      _id
      name
      remarks
      price
      pickedCount
      images
    }
  }
`);

export const FETCH_TRAVELPRODUCTS = graphql(`
  query fetchTravelproducts {
    fetchTravelproducts {
      _id
      name
      remarks
      price
      pickedCount
      images
      tags
      seller {
        _id
        name
        picture
      }
    }
  }
`);

