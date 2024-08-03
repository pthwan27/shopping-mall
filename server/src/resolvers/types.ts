type ResolverFunction = (
  parent: any,
  args: { [key: string]: any },
  context: {},
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
