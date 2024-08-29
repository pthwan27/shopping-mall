import { Products } from "../../graphqlTypes";
import AdminProductItem from "./adminProductItem";

const ProductList = ({ list }: { list: Products }) => (
  <ul className="products">
    {list.products.map((product) => (
      <AdminProductItem {...product} key={product.id} />
    ))}
  </ul>
);

export default ProductList;
