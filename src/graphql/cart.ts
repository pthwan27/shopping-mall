import { gql } from "graphql-tag";

const GET_CART = gql`
  query GET_CART {
    cart {
      id
      imageURL
      price
      title
      amount
    }
  }
`;

export const ADD_CART = gql`
  mutation ADD_CART($id: string) {
    id
    imageURL
    price
    title
    amount
  }
`;

export default GET_CART;
