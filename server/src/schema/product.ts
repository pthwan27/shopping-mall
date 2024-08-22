import { gql } from "apollo-server-express";

const productSchema = gql`
  type Product {
    id: ID!
    imageURL: String!
    title: String!
    price: Int!
    description: String
    createdAt: String
  }

  type Query {
    products(cursor: ID): [Product!]
    product(id: ID!): Product!
  }

  type Mutation {
    addProduct(info: productInfo!): Product!
    updateProduct(info: productInfo!): [Product!]
    deleteProduct(id: ID!): ID!
  }
  input productInfo {
    id: ID!
    imageURL: String!
    title: String!
    price: Int!
    description: String
    createdAt: String
  }
`;

export default productSchema;
