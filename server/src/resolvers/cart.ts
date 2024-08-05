import { DBField, writeDB } from "../dbController";
import { Product, Cart, CartResolver } from "./types";

const setCartData = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: CartResolver = {
  Query: {
    carts: (_, __, { db }) => {
      return db.cart;
    },
  },
  Cart: {
    product: (parent, _, { db }) =>
      db.products.find((item: Product) => item.id === parent.id),
  },
  Mutation: {
    addCart: (_, { id }, { db }) => {
      //상품 존재 여부 확인
      if (!id) throw Error("장바구니에 추가할 상품이 존재하지 않습니다");

      const targetProduct = db.products.find((item: Product) => item.id === id);

      if (!targetProduct) {
        throw new Error("장바구니에 추가할 상품이 존재하지 않습니다");
      }

      // 이미 카트에 있는 물건이면 amount+1
      const cartExistItemIdx = db.cart.findIndex(
        (item: Product) => item.id === id
      );

      let newCartItem: Cart;

      if (cartExistItemIdx >= 0) {
        db.cart[cartExistItemIdx].amount += 1;
        newCartItem = db.cart[cartExistItemIdx];
      } else {
        newCartItem = {
          id,
          amount: 1,
          product: targetProduct,
        };
        db.cart.push(newCartItem);
      }

      setCartData(db.cart);

      return newCartItem;
    },
    updateCart: (_, { id, amount }, { db }) => {
      const newData = { ...db.cart };

      if (!newData[id]) {
        throw new Error("없는 데이터입니다");
      }
      const newItem = {
        ...newData[id],
        amount,
      };

      newData[id] = newItem;

      writeDB(DBField.CART, newData);

      return newItem;
    },
    deleteCart: (_, { id }, { db }) => {
      const newData = { ...db.cart };

      if (!id) throw new Error("삭제할 상품이 존재하지 않습니다");

      delete newData[id];

      writeDB(DBField.CART, newData);
      return id;
    },
    executePay: (_, { info }, { db }) => {
      let newData = { ...db.cart };

      info.forEach(({ id, amount }: { id: string; amount: number }) => {
        const targetCartItem = newData.find((item: Cart) => item.id === id);
        if (targetCartItem) {
          targetCartItem.amount -= amount;

          if (targetCartItem.amount <= 0) {
            newData = newData.filter((item: Cart) => item.id !== id);
          }
        }
      });

      writeDB(DBField.CART, newData);

      return db.cart;
    },
  },
};

export default cartResolver;
