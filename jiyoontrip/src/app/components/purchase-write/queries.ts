export const CREATE_TRAVELPRODUCT_QUERY = `
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      seller {
        _id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPLOAD_FILE_QUERY = `
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
      createdAt
      updatedAt
      isUsed
    }
  }
`;
