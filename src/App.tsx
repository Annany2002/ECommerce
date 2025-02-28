import { Routes, Route } from "react-router";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
