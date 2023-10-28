import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider";
import UserProgressProvider from "./components/store/UserProgressProvider";

function App() {
  return (
    <UserProgressProvider>
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartProvider>
    </UserProgressProvider>
  );
}

export default App;
