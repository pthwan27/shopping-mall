import { graphql } from "msw";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";
import GET_CART, { ADD_CART, DELETE_CART, UPDATE_CART } from "../graphql/cart";
import { CartType } from "../graphqlTypes";

const mock_products = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + "",
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
    const newCartData = { ...cartData };
    const id = req.variables.id;

    const targetProduct = mock_products.find((item) => item.id === req.variables.id);
    if (!targetProduct) {
      throw new Error("상품이 없습니다");
    }
    const newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1,
    };
    newCartData[id] = newItem;

    cartData = newCartData;
    return res(ctx.data(newItem));
  }),

  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;

    if (!newData[id]) {
      throw new Error("없는 데이터입니다");
    }
    const newItem = {
      ...newData[id],
      amount,
    };

    newData[id] = newItem;

    cartData = newData;

    return res(ctx.data(newItem));
  }),
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };

    if (!id) throw new Error("삭제할 상품이 존재하지 않습니다");

    delete newData[id];

    cartData = newData;
    return res(ctx.data(id));
  }),
];
