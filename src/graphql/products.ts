import { gql } from "graphql-tag";

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: string) {
    id
    imageURL
    price
    title
    description
    createdAt
  }
`;

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    id
    imageURL
    price
    title
    description
    createdAt
  }
`;

export default GET_PRODUCTS;
