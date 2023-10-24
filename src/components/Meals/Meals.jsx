import { useState, useEffect } from "react";

import MealItem from "./MealItem";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "http://localhost:5173/backend/data/available-meals.json"
      );
      const mealsData = await response.json();
      setMeals(mealsData);
    };

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem
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
