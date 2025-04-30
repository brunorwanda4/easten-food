import { Link, useParams } from "react-router-dom";
import { fakeProducts } from "../data/products";
import { cn } from "../utils/utils";
import { ShuffleArray } from "./Products";
import ProductCard from "../components/cards/product-card";
import { useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";

const Product = () => {
  const { id } = useParams();
  const [isInCart, setIsInCart] = useState(false);
  const product = fakeProducts.find((item) => item.id === id);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(product && product.id ? cart.includes(product.id) : false);
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-700">
            😕 Product Not Found
          </h1>
          <p className="text-gray-500">
            We couldn't find the product you're looking for.
          </p>
        </div>
      </div>
    );
  }

  const someCategory = ShuffleArray(
    fakeProducts.filter((item) => item.category === product.category)
  );

  const toggleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.includes(product.id)) {
      // Remove from cart
      const updatedCart = cart.filter((id: string) => id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsInCart(false);
    } else {
      // Add to cart
      cart.push(product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsInCart(true);
    }
  };

  return (
    <div className="px-4 pt-4 w-full flex flex-col space-y-6">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        <img
          src={product.image}
          alt={cn("product not found:", product.name)}
          className="w-full max-w-md h-80 md:h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
        />
        <div className="space-y-4 flex-1">
          <h2 className="text-2xl md:text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600 text-sm md:text-base">
            {product.description}
          </p>

          <div className="flex items-center space-x-2">
            <div className="rating rating-md md:rating-lg">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="product-rating"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label={`${index + 1} star`}
                  checked={index + 1 === Math.round(product.rating)}
                  readOnly
                />
              ))}
            </div>
            <span className="text-sm md:text-lg font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-semibold">
            {product.price} RWF
          </h3>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="btn btn-lg bg-amber-500 w-full sm:w-auto">
              Buy now
            </button>
            <button
              onClick={() => toggleCart()}
              className={cn(
                "btn btn-lg w-full sm:w-auto",
                isInCart ? "btn-error" : ""
              )}
            >
              {isInCart ? "Remove Cart" : "Add to cart"}
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <Link to={"/products"} className="btn btn-lg w-full">
              View all products
            </Link>
            <Link to={"/card"} className="btn btn-lg btn-primary w-full">
              <PiShoppingCart size={24} /> View all product in cards
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="space-y-4">
        <h2 className="basic-title">Some category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {someCategory.map((item) => {
            if (item.id === product.id) return null;
            return (
              <ProductCard
                product={item}
                isSmallBtn
                noDescription
                className="w-full"
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
