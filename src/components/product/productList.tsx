import { Products } from "../../graphqlTypes";
import ProductItem from "./productItem";

const ProductList = ({ list }: { list: Products }) => (
  <ul className="products">
    {list.products.map((product) => (
      <ProductItem {...product} key={product.id} />
    ))}
  </ul>
);

export default ProductList;
