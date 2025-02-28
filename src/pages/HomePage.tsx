import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { Product } from "../types/Product";

const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const mappedData: Product[] = data.map((item: any) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          rating: item.rating,
        }));
        setProducts(mappedData);
        setFilteredProducts(mappedData);
      } catch (err) {
        console.error(err);
        setError("Error fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <div className=" w-full px-4 py-6 bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {/* Filter Section */}
      <div className="mb-6">
        <label htmlFor="category" className="mr-2 font-medium">
          Filter by category:
        </label>
        <select
          id="category"
          className="border border-gray-300 rounded p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} onAddToCart={addToCart} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
