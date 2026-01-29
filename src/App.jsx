import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Checkout from "./components/Checkout.jsx";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgress.jsx";

function App() {
  return (
    <CartContextProvider>
      <UserProgressProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserProgressProvider>
    </CartContextProvider>
  );
}

export default App;
