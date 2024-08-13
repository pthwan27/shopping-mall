import { gql } from "graphql-tag";

const GET_CART = gql`
  query GET_CART {
    carts {
      id
      amount
      product {
        id
        imageURL
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const ADD_CART = gql`
  mutation ADD_CART($id: ID!) {
    addCart(id: $id) {
      id
      amount
      product {
        id
        imageURL
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(id: $id, amount: $amount) {
      id
      amount
      product {
        id
        imageURL
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart(id: $id) {
      id
    }
  }
`;

export default GET_CART;
