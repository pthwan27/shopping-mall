import Product from "../../graphqlTypes";

const ProductDetail = ({ title, price, description, imageURL }: Product) => (
  <div className="product-detail">
    <p className="product-detail__title">{title}</p>
    <img className="product-detail__image" src={imageURL}></img>
    <p className="product-detail__description">{description}</p>
    <span className="product-detail__price">${price}</span>
  </div>
);

export default ProductDetail;
