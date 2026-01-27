import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContexProvider } from "./store/CartContext";

function App() {
  return (
    <CartContexProvider>
      <Header />
      <Meals />
    </CartContexProvider>
  );
}

export default App;
