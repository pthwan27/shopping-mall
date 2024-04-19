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

export type CartType = {
  id: string;
  imageURL: string;
  title: string;
  price: number;
  amount: number;
};
