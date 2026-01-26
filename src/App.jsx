import { useEffect, useState } from "react";

import Header from "./components/Header";
import Meals from "./components/Meals";

function App() {
  const [getData, setGetData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const [addToCart, setAddToCart] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setloading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");

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

  function handleAddToCart() {
    setAddToCart(addToCart + 1);
  }

  return (
    <>
      <Header itemAdded={addToCart} />
      {loading && <p className="load">loading please wait...</p>}
      {error ? (
        "Ops! Something went wrong pls try again"
      ) : (
        <div id="meals">
          {getData.map((meal) => (
            <Meals
              key={meal.id}
              name={meal.name}
              price={meal.price}
              description={meal.description}
              img={meal.image}
              onAdd={handleAddToCart}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
