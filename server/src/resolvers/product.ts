import { Product, Resolver } from "./types";

const productResolver: Resolver = {
  Query: {
    products: (_, { cursor }, { db }) => {
      const fromIdx =
        db.products.findIndex((product: Product) => product.id === cursor) + 1;

      console.log(fromIdx);
      return db.products.slice(fromIdx, fromIdx + 15) || [];
    },
    product: (_, { id }, { db }) => {
      const found = db.products.find((product: Product) => product.id === id);

      if (found) return found;

      return null;
    },
  },
  Mutation: {},
};

export default productResolver;
