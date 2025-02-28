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

export type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};
