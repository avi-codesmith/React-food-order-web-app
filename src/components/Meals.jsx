export default function Meals({ name, price, description, img, onAdd }) {
  console.log("🚀 ~ Meals ~ img:", `http://localhost:3000/${img}`);
  return (
    <>
      <div className="meal-item">
        <article>
          <img
            src={`http://localhost:3000/${img}`}
            alt={name + " " + "image"}
          />
          <h3>{name}</h3>
          <p className="meal-item-price">
            ₹ {Math.floor(price * 91.58).toLocaleString("en-IN")}
          </p>
          <p className="meal-item-description">{description}</p>
          <button onClick={onAdd} className="button">
            Add to Cart
          </button>
        </article>
      </div>
    </>
  );
}
