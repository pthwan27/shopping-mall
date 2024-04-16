type Product = {
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

export default Product;
