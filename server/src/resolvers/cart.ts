import { DBField, writeDB } from "../dbController";
import { Product, Cart, CartResolver } from "./types";

const setCartData = (data: Cart | Cart[]) => writeDB(DBField.CART, data);

const cartResolver: CartResolver = {
  Query: {
    carts: (_, __, { db }) => {
      return db.cart;
    },
  },
  Cart: {
    product: (parent, _, { db }) => db.products.find((item: Product) => item.id === parent.id),
  },
  Mutation: {
    addCart: (_, { id }, { db }) => {
      //상품 존재 여부 확인
      if (!id) throw new Error("장바구니에 추가할 상품이 존재하지 않습니다");

      const targetProduct = db.products.find((item: Product) => item.id === id);

      if (!targetProduct) {
        throw Error("장바구니에 추가할 상품이 존재하지 않습니다");
      }

      // 이미 카트에 있는 물건이면 amount+1
      const cartExistItemIdx = db.cart.findIndex((item: Product) => item.id === id);

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
      if (!id) throw new Error("장바구니에 추가할 상품이 존재하지 않습니다");

      const updateCartItemIdx = db.cart.findIndex((item: Cart) => item.id === id);

      if (updateCartItemIdx < 0) {
        throw Error("장바구니에 상품이 없습니다");
      }
      const newCart = [...db.cart];
      newCart[updateCartItemIdx].amount = amount;

      setCartData(newCart);

      return newCart;
    },
    deleteCart: (_, { id }, { db }) => {
      if (!id) throw new Error("삭제할 상품이 존재하지 않습니다");

      const deleteCartItemIdx = db.cart.findIndex((item: Cart) => item.id === id);

      if (deleteCartItemIdx < 0) {
        throw new Error("장바구니에 상품이 없습니다");
      }
      db.cart.splice(deleteCartItemIdx, 1);

      setCartData(db.cart);
      return id;
    },
    executePay: (_, { info }, { db }) => {
      if (!info) throw new Error("결제할 상품이 존재하지 않습니다");

      const infoMap = new Map<string, number>(
        info.map(({ id, amount }: { id: string; amount: number }) => [id, amount])
      );

      const newCart = db.cart.reduce((acc: Cart[], item: Cart) => {
        const targetItemAmount = infoMap.get(item.id);

        if (targetItemAmount && targetItemAmount > 0) {
          item.amount -= targetItemAmount;
        }

        if (item.amount > 0) {
          acc.push(item);
        }

        return acc;
      }, [] as Cart[]);

      setCartData(newCart);

      return newCart;
    },
  },
};

export default cartResolver;
