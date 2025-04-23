import { Link } from "react-router-dom";

const Gnb = () => (
  <nav className="gnb">
    <ul>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/products">PRODUCT</Link>
      </li>
      <li>
        <Link to="/cart">CART</Link>
      </li>
    </ul>
  </nav>
);

export default Gnb;
