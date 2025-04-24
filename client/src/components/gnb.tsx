import { Link } from "react-router-dom";
import SvgHome from "../assets/svg/Home";
import SvgCart from "../assets/svg/Cart";
import SvgProduct from "../assets/svg/Product";
import { ReactElement } from "react";

const Gnb = () => {
  const menu: string[] = ["Home", "Products", "Cart"];
  const menuSvgs: ReactElement[] = [
    <SvgHome width={32} height={32} />,
    <SvgProduct width={32} height={32} />,
    <SvgCart width={32} height={32} />,
  ];

  return (
    <nav className="gnb">
      <ul>
        {menu.map((m, idx) => (
          <Link to={idx === 0 ? "/" : menu[idx].toLocaleLowerCase()}>
            {menuSvgs[idx]}
            <span>{m}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Gnb;
