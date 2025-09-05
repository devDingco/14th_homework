import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    createUser(createUserInput: { email: $email, password: $password, name: $name }) {
      _id
      email
      name
    }
  }
`;


