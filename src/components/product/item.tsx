import { Product } from "../../types";

const ProductItem = ({ title, price, category, image, rating }: Product) => (
  <li className="product-item">
    <p className="product-item__category">{category}</p>
    <p className="product-item__title">{title}</p>
    <img className="product-item__image" src={image}></img>
    <span className="product-item__price">${price}</span>
    <span className="product-item__count">{rating.count}</span>
    <span className="product-item__rate">{rating.rate}</span>
  </li>
);

export default ProductItem;
