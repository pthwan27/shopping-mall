import { Resolver } from "./types";

const mock_products = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + "",
  imageURL: `https://picsum.photos/id/${idx + 10}/200/150`,
  price: 20000,
  title: `임시 ${idx + 1}번 상품`,
  description: `임시 ${idx + 1}번 상품 설명`,
  createdAt: new Date(1713260035562 + idx * 1000 * 60 * 60 * 10).toString(),
}));

const productResolver: Resolver = {
  Query: {
    products: (parent, args, context, info) => {
      return mock_products;
    },
    product: (parent, { id }, context, info) => {
      const found = mock_products.find((item) => item.id === id);
      if (found) return found;

      return null;
    },
  },
  Mutation: {},
};

export default productResolver;
