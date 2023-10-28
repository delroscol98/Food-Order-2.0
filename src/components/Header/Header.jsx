import { useContext } from "react";
import logo from "../../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

import Button from "../UI/Button";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartLength = cartCtx.items.reduce(
    (numberOfItems, item) => numberOfItems + item.quantity,
    0
  );

  const showCartHandler = () => {
    userProgressCtx.showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="header logo" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCartHandler}>
          Cart ({cartLength})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
