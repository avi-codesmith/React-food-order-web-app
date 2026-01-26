export default function Meals({ name, price, description, img }) {
  const indianPrice = `₹ ${Math.floor(price * 91.58).toLocaleString("en-IN")}`;

  return (
    <>
      <div className="meal-item">
        <article>
          <img
            src={`https://raw.githubusercontent.com/avi-codesmith/React-food-order-web-app/main/backend/public/${img}`}
          />
          <h3>{name}</h3>
          <p className="meal-item-price">
            <del>
              ₹ {Math.floor(price * 91.58 + 967).toLocaleString("en-IN")}
            </del>
            {indianPrice}
          </p>
          <p className="meal-item-description">{description}</p>
          <button className="button">Add to Cart</button>
        </article>
      </div>
    </>
  );
}
