import { Product, Resolver } from "./types";
import { DBField, writeDB } from "../dbController";

const setProductData = (data: Product | Product[]) =>
  writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
  Query: {
    products: (_, { cursor, showDeleted = false }, { db }) => {
      const filterDb = showDeleted
        ? db.products
        : db.products.filter((product: Product) => !!product.createdAt);

      const fromIdx =
        filterDb.findIndex((product: Product) => product.id === cursor) + 1;

      return filterDb.slice(fromIdx, fromIdx + 15) || [];
    },
    product: (_, { id }, { db }) => {
      const found = db.products.find((product: Product) => product.id === id);

      if (found) return found;

      return null;
    },
  },
  Mutation: {
    addProduct: (_, { info }, { db }) => {
      if (!info) throw new Error("추가할 상품이 존재하지 않습니다.");

      const addProductExistIdx = db.products.findIndex(
        (item: Product) => item.id === info.id
      );
      if (addProductExistIdx) throw Error("이미 추가된 상품입니다.");

      const newProduct = {
        ...info,
        imageURL: `https://picsum.photos/id/${db.products.length}/200/150`,
        description: info.description
          ? info.description
          : `${info.title} 설명입니다`,
        createdAt: new Date(),
      };

      console.log(newProduct);

      db.products.push(newProduct);

      setProductData(db.products);

      return newProduct;
    },
    updateProduct: (_, { info }, { db }) => {
      if (!info.id) throw new Error("변경할 상품이 존재하지 않습니다.");

      const updateProductIdx = db.products.findIndex(
        (item: Product) => item.id === info.id
      );

      if (updateProductIdx < 0) {
        throw Error("변경할 상품이 존재하지 않습니다.");
      }
      const updateProduct = {
        ...db.products[updateProductIdx],
        ...info,
        description:
          info.description ||
          db.products[updateProductIdx].description ||
          `${info.title} 설명입니다`,
      };

      db.products.splice(updateProductIdx, 1, updateProduct);

      const newProducts = db.products;

      setProductData(newProducts);

      return newProducts;
    },
    deleteProduct: (_, { id }, { db }) => {
      if (!id) throw new Error("변경할 상품이 존재하지 않습니다.");

      const deleteProductIdx = db.products.findIndex(
        (item: Product) => item.id === id
      );

      if (deleteProductIdx < 0) {
        throw Error("변경할 상품이 존재하지 않습니다.");
      }

      const deleteProductItem = { ...db.products[deleteProductIdx] };

      delete deleteProductItem.createdAt;

      db.products.splice(deleteProductIdx, 1, deleteProductItem);

      setProductData(db.products);

      return id;
    },
  },
};

export default productResolver;
