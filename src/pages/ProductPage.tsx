import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Product } from "../types/Product";
import { useCart } from "../context/CartContext";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError(null);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        const mappedProduct: Product = {
          id: data.id,
          name: data.title,
          price: data.price,
          description: data.description,
          category: data.category,
          image: data.image,
          rating: data.rating,
        };
        setProduct(mappedProduct);
      } catch (err) {
        console.error(err);
        setError("Error fetching product details. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-red-600">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          src={product.image}
          alt={product.name}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
          <div className="flex items-center mb-4">
            <svg
              className="w-5 h-5 text-yellow-500 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
            </svg>
            <span className="ml-1 text-gray-700">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
