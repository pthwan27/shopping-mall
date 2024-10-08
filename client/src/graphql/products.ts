import { gql } from "graphql-tag";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($cursor: ID, $showDeleted: Boolean) {
    products(cursor: $cursor, showDeleted: $showDeleted) {
      id
      imageURL
      price
      title
      description
      createdAt
    }
  }
`;
export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      imageURL
      price
      title
      description
      createdAt
    }
  }
`;
export default GET_PRODUCTS;
