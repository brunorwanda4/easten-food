import { useEffect, useState } from "react";
import { fakeProducts, productProps } from "../data/products";
import ProductCard from "../components/cards/product-card";
import { Link } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { GoTrash } from "react-icons/go";

const Card = () => {
  const [cartProducts, setCartProducts] = useState<productProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const cartIds = JSON.parse(localStorage.getItem("cart") || "[]");
      const filteredProducts = fakeProducts.filter((product) =>
        cartIds.includes(product.id)
      );
      setCartProducts(filteredProducts);
      setLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl font-medium">
        Loading your cart...
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-700">
            😕 They are no products in your carts
          </h1>
          <p className="text-gray-500">
            This page it contain the products you will buy
          </p>
          <Link to={"/products"} className=" btn btn-lg bg-amber-500">
            <PiShoppingCart size={24} /> Add some thing in carts
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price,
    0
  );
  const handleResetCart = () => {
    localStorage.removeItem("cart");
    setCartProducts([]);
  };
  return (
    <section className=" px-4 pt-4 space-y-4">
      <div className=" flex flex-col space-y-2">
        <h1 className=" basic-title">Your products in cards</h1>
        <div className=" flex space-x-6 items-center">
            <div className="avatar-group -space-x-6">
              {cartProducts.slice(0, 4).map((item) => {
                return (
                  <div key={item.id} className="avatar">
                    <div className="w-24">
                      <img src={item.image} />
                    </div>
                  </div>
                );
              })}
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-24">
                  <span>{cartProducts.length}</span>
                </div>
              </div>
            </div>
          <div>
            <h3 className="text-lg font-medium">Total Price</h3>
            <span className=" basic-title"> {totalPrice.toFixed(2)} RWF</span>
          </div>
          <div>
            <h3 className="text-lg font-medium">Remove all product in cart</h3>
            <button onClick={() => handleResetCart()} className=" btn btn-lg btn-error"><GoTrash size={23} /> Reset cart</button>
          </div>
          <Link to={"/products"} className=" btn btn-lg btn-primary">View All products</Link>
        </div>
      </div>
      <div>
        <h2 className=" basic-title">
          All Products in your cart - {cartProducts.length}
        </h2>
        <div className=" gap-4 grid grid-cols-3 mt-2">
          {cartProducts.map((item) => {
            return <ProductCard key={item.id} product={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Card;
