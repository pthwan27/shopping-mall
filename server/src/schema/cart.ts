import { gql } from "apollo-server-express";

const cartSchema = gql`
  type Cart {
    id: ID!
    amount: Int!
    product: Product
  }

  type Query {
    carts: [Cart!]
  }

  type Mutation {
    addCart(id: ID!): Cart!
    updateCart(id: ID!, amount: Int!): Cart!
    deleteCart(id: ID!): ID!
    executePay(info: [PayInfo!]): [Cart!]
  }

  input PayInfo {
    id: ID!
    amout: Int!
  }
`;

export default cartSchema;
