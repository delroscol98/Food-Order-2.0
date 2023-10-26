import currencyFormatter from "../utilities/formatting";
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = () => {
    cartCtx.addItem(props.meal);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={props.imgUrl} alt={props.name} />
        <div>
          <h3>{props.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(props.price)}
          </p>
          <p className="meal-item-description">{props.description}</p>
          <p className="meal-item-actions">
            <Button onClick={addItemToCartHandler}>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
};

export default MealItem;
