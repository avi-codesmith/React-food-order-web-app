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
          throw new Error(`Ops! API Error: ${response.status}`);
        }

        const data = await response.json();
        setGetData(data);
      } catch (error) {
        setError(true);
        setloading(false);
        throw new Error("404 error please check your internet connection");
      }
      setloading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <div className="loading">
          <p className="loader"></p> <p className="load-text">Loading...</p>
        </div>
      )}

      {error ? (
        <p className="error">404 error please check your internet connection</p>
      ) : (
        <div id="meals">
          {getData.map((meal) => (
            <MealsCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </>
  );
}
