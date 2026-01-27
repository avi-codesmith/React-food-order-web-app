import { use } from "react";
import CartContex from "../store/CartContext.jsx";

// key={meal.id}
// name={meal.name}
// price={meal.price}
// description={meal.description}
// img={meal.image}

export default function Meals({ meal }) {
  const indianPrice = `₹ ${Math.floor(meal.price * 91.58).toLocaleString(
    "en-IN"
  )}`;

  const { addItem } = use(CartContex);

  function handleAddToCart() {
    addItem(meal);
  }

  return (
    <>
      <div className="meal-item">
        <article>
          <img
            src={`https://raw.githubusercontent.com/avi-codesmith/React-food-order-web-app/main/backend/public/${meal.image}`}
          />
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            <del>
              ₹ {Math.floor(meal.price * 91.58 + 967).toLocaleString("en-IN")}
            </del>
            {indianPrice}
          </p>
          <p className="meal-item-description">{meal.description}</p>
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </article>
      </div>
    </>
  );
}
