export type Product = {
  id: string;
  imageURL: string;
  title: string;
  price: number;
  description: string;
  createdAt: string;
};

export type Products = {
  products: Product[];
};

export type Cart = {
  id: string;
  amount: number;
  product: Product;
};

export type Carts = {
  carts: Cart[];
};

export type PayInfo = {
  id: string;
  amount: number;
};
