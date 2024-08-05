import { Product, Resolver } from "./types";

const productResolver: Resolver = {
  Query: {
    products: (_, __, { db }) => {
      return db.products;
    },
    product: (_, { id }, { db }) => {
      const found = db.products.find((item: Product) => item.id === id);

      if (found) return found;

      return null;
    },
  },
  Mutation: {},
};

export default productResolver;
