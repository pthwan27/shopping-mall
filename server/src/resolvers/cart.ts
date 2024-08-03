import { Resolver } from "./types";

const mock_products = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + "",
  imageURL: `https://picsum.photos/id/${idx + 10}/200/150`,
  price: 20000,
  title: `임시 ${idx + 1}번 상품`,
  description: `임시 ${idx + 1}번 상품 설명`,
  createdAt: new Date(1713260035562 + idx * 1000 * 60 * 60 * 10).toString(),
}));

let cartData = [
  { id: "1", amount: 1 },
  { id: "2", amount: 2 },
];

const cartResolver: Resolver = {
  Query: {
    carts: (parent, args, context, info) => {
      return cartData;
    },
  },
  Mutation: {
    addCart: (parent, { id }, context, info) => {
      const newCartData = { ...cartData };
      const targetProduct = mock_products.find((item) => item.id === id);
      if (!targetProduct) {
        throw new Error("상품이 없습니다");
      }
      const newItem = {
        ...targetProduct,
        amount: (newCartData[id]?.amount || 0) + 1,
      };
      newCartData[id] = newItem;

      cartData = newCartData;

      return newItem;
    },
    updateCart: (parent, { id, amount }, context, info) => {
      const newData = { ...cartData };

      if (!newData[id]) {
        throw new Error("없는 데이터입니다");
      }
      const newItem = {
        ...newData[id],
        amount,
      };

      newData[id] = newItem;

      cartData = newData;

      return newItem;
    },
    deleteCart: (parent, { id }, context, info) => {
      const newData = { ...cartData };

      if (!id) throw new Error("삭제할 상품이 존재하지 않습니다");

      delete newData[id];

      cartData = newData;
      return id;
    },
    executePay: (parent, { info }) => {
      let newData = { ...cartData };

      info.forEach(({ id, amount }: { id: string; amount: number }) => {
        const targetCartItem = newData.find((item) => item.id === id);
        if (targetCartItem) {
          targetCartItem.amount -= amount;

          if (targetCartItem.amount <= 0) {
            newData = newData.filter((item) => item.id !== id);
          }
        }
      });

      cartData = newData;

      return cartData;
    },
  },
};

export default cartResolver;
