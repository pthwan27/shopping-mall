import { gql } from "apollo-server-express";

const productSchema = gql`
  type Product {
    id: ID!
    imageURL: String!
    title: String!
    price: Int!
    description: String
    createdAt: Float
  }

  type Query {
    products: [Product!]
    product(id: ID!): Product!
  }
`;

export default productSchema;
