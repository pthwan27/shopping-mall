import { Product } from "../../types";

const ProductDetail = ({ title, price, description, category, image, rating }: Product) => (
  <div className="product-detail">
    <p className="product-detail__category">{category}</p>
    <p className="product-detail__title">{title}</p>
    <img className="product-detail__image" src={image}></img>
    <p className="product-detail__description">{description}</p>
    <span className="product-detail__price">${price}</span>
    <span className="product-detail__count">{rating.count}</span>
    <span className="product-detail__rate">{rating.rate}</span>
  </div>
);

export default ProductDetail;
