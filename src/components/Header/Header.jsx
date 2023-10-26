import { useContext } from "react";
import logo from "../../assets/logo.jpg";
import CartContext from "../store/CartContext";

import Button from "../UI/Button";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const cartLength = cartCtx.items.reduce(
    (numberOfItems, item) => numberOfItems + item.quantity,
    0
  );

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="header logo" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({cartLength})</Button>
      </nav>
    </header>
  );
};

export default Header;
