import React from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart && onAddToCart(product);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      {/* Product Image with Fixed Size */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          className="h-full w-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>

        {/* Rating */}
        <div className="mt-2 flex items-center">
          <svg
            className="w-4 h-4 text-yellow-500 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
          </svg>
          <span className="ml-1 text-sm text-gray-700">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Description (Truncated to 3 lines for uniform height) */}
        <p className="text-gray-700 text-sm mt-2 line-clamp-3 flex-grow">
          {product.description}
        </p>

        {/* Add to Cart Button - Aligned at Bottom */}
        <div className="mt-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
