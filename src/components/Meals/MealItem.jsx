import currencyFormatter from "../utilities/formatting";
import Button from "../UI/Button";

const MealItem = (props) => {
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
            <Button>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
};

export default MealItem;
