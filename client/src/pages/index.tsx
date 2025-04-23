import ProductList from "../components/product/productList";

const HomePage = () => (
  <div className="home-page">
    <div className="overview">
      <h3 className="title">Shopping-mall</h3>
      <div className="desc">This is a shopping mall community site</div>
      <div className="desc">It was created for frontend learning.</div>
    </div>
    <ProductList />
  </div>
);

export default HomePage;
