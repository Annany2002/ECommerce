import { Link } from "react-router";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          E-Commerce
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-gray-600 hover:text-gray-800">
                Cart ({totalItems})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
