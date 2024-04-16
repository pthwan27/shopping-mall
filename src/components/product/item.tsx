import { Link } from "react-router-dom";
import Product from "../../graphqlTypes";

const ProductItem = ({ id, title, price, imageURL }: Product) => (
  <li className="product-item">
    <Link to={`/products/${id}`}>
      <p className="product-item__title">{title}</p>
      <img className="product-item__image" src={imageURL}></img>
      <span className="product-item__price">${price}</span>
    </Link>
  </li>
);

export default ProductItem;
