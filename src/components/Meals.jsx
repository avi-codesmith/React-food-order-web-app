import useHttp from "../hooks/useHttp";
import MealsCard from "./MealsCard";

const initialConfig = {};

export default function MealsData() {
  const { data, error, loading } = useHttp(
    "https://raw.githubusercontent.com/avi-codesmith/React-food-order-web-app/main/backend/data/available-meals.json",
    initialConfig,
    []
  );

  if (loading) {
    return (
      <div className="loading">
        <p className="loader"></p> <p className="load-text">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading">
        <p className="load-text">No meals found.</p>
      </div>
    );
  }

  return (
    <>
      {error ? (
        <p className="error">
          ⚠️ Ops! Something went wrong
          <p>● Please check your internet connection</p>
          <p>● Or try reload the website</p>
        </p>
      ) : (
        <div id="meals">
          {data.map((meal) => (
            <MealsCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </>
  );
}
