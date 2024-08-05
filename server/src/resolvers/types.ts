type ResolverFunction = (
  parent: any,
  args: { [key: string]: any },
  context: { [key: string]: any },
  info: any
) => any;
4;

export type Resolver = {
  Query: {
    [key: string]: ResolverFunction;
  };
  Mutation: {
    [key: string]: ResolverFunction;
  };
};
export type CartResolver = Resolver & {
  Cart: {
    [key: string]: ResolverFunction;
  };
};

export type Product = {
  id: string;
  imageURL: string;
  title: string;
  price: number;
  description: string;
  createdAt: string;
};

export type Cart = {
  id: string;
  amount: number;
  product: Product;
};
