import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <p className="text-gray-700 text-2xl">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between p-4 bg-white shadow rounded"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="sm:text-md md:text-lg font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
            <div className="text-right">
              <p className="text-xl font-bold">
                Total: ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
