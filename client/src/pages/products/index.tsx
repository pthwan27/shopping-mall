import ProductList from "../../components/product/productList";

const ProductListPage = () => (
  <div className="product-page">
    <div className="overview">
      <h3 className="title">Products</h3>
      <div className="desc">This page shows temporary product lists.</div>
      <div className="desc">It was created using React and Vite.</div>
    </div>
    <ProductList />
  </div>
);
export default ProductListPage;
