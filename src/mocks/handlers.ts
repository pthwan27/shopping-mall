import { graphql } from "msw";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";
import GET_CART, { ADD_CART } from "../graphql/cart";
import { CartType } from "../graphqlTypes";

const mock_products = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + 1 + "",
  imageURL: `https://source.unsplash.com/200x150/?nature/${idx + 1}`,
  price: 20000,
  title: `임시 ${idx + 1}번 상품`,
  description: `임시 ${idx + 1}번 상품 설명`,
  createdAt: new Date(1713260035562 + idx * 1000 * 60 * 60 * 10).toString(),
}));

let cartData: { [key: string]: CartType } = (() => ({}))();

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

  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),

  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const id = req.variables.id;

    if (newData[id]) {
      newData[id] = {
        ...newData[id],
        amount: (newData[id].amount || 0) + 1,
      };
    } else {
      const found = mock_products.find((item) => item.id === req.variables.id);

      if (found) {
        newData[id] = {
          ...found,
          amount: 1,
        };
      }
    }
    cartData = newData;
    return res(ctx.data(newData));
  }),
];
