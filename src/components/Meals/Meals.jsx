import Error from "../Error/error";
import useFetch from "../hooks/use-fetch";

import MealItem from "./MealItem";

const requestConfig = {};

const Meals = () => {
  const {
    isLoading,
    error,
    data: meals,
  } = useFetch(
    "http://localhost:5173/backend/data/available-meals.json",
    requestConfig
  );

  if (isLoading) {
    return <p className="center">Still fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem
          meal={meal}
          key={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description}
          imgUrl={meal.image}
        />
      ))}
    </ul>
  );
};

export default Meals;
