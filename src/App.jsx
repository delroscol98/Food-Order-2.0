import Cart from "./components/Cart/Cart";
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
      </CartProvider>
    </UserProgressProvider>
  );
}

export default App;
