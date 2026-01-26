import { useState, useEffect } from "react";

import MealsCard from "./MealsCard";

export default function MealsData() {
  const [getData, setGetData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setloading(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/avi-codesmith/React-food-order-web-app/main/backend/data/available-meals.json"
        );

        if (!response.ok) {
          setError(true);
          setloading(false);
          throw new Error("ops! something went wrong");
        }

        const data = await response.json();
        setGetData(data);
      } catch (error) {
        setError(true);
        setloading(false);
        throw new Error("ops! something went wrong");
      }
      setloading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {loading && <p className="load">loading please wait...</p>}
      {error ? (
        "Ops! Something went wrong pls try again"
      ) : (
        <div id="meals">
          {getData.map((meal) => (
            <MealsCard
              key={meal.id}
              name={meal.name}
              price={meal.price}
              description={meal.description}
              img={meal.image}
            />
          ))}
        </div>
      )}
    </>
  );
}
