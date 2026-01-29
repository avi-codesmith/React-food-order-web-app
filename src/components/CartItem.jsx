export default function CartItem({
  name,
  quantity,
  price,
  image,
  onInc,
  onDec,
}) {
  const imgSrc =
    "https://raw.githubusercontent.com/avi-codesmith/React-food-order-web-app/main/backend/public/";

  return (
    <li className="cart-item">
      <p className="item">
        <img className="food-s1" alt={name} src={imgSrc + image} />
        {name} - ₹{Math.floor(price * 91.58).toLocaleString("en-IN")} ×{" "}
        {quantity}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDec}>-</button>
        <span>{quantity}</span>
        <button onClick={onInc}>+</button>
      </p>
    </li>
  );
}
