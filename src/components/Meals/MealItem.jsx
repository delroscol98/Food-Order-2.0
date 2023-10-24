const MealItem = (props) => {
  return (
    <li className="meal-item">
      <article>
        <img src={props.imgUrl} alt={props.name} />
        <div>
          <h3>{props.name}</h3>
          <p className="meal-item-price">{props.price}</p>
          <p className="meal-item-description">{props.description}</p>
          <p className="meal-item-actions">
            <button className="button">Add to Cart</button>
          </p>
        </div>
      </article>
    </li>
  );
};

export default MealItem;
