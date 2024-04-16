import { graphql } from "msw";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";
import { v4 as uuid } from "uuid";

const mock_products = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + 1 + "",
  imageURL: `https://source.unsplash.com/200x150/?nature/${idx + 1}`,
  price: 20000,
  title: `임시 ${idx}번 상품`,
  description: `임시 ${idx}번 상품 설명`,
  createdAt: new Date(1713260035562 + idx * 1000 * 60 * 60 * 10).toString(),
}));

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mock_products,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mock_products.find((item) => item.id === req.variables.id);
    if (found) return res(ctx.data(found));
    return res();
  }),
];
