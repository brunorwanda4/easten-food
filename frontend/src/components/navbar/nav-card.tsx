import { useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { fakeProducts, productProps } from "../../data/products";
import { Link } from "react-router-dom";

const NavCard = () => {
  const [cartProducts, setCartProducts] = useState<productProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const cartIds = JSON.parse(localStorage.getItem("cart") || "[]");
      const filteredProducts = fakeProducts.filter((product) =>
        cartIds.includes(product.id)
      );
      setCartProducts(filteredProducts);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div className=" flex -space-x-2">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost m-1 rounded-full"
          >
            <PiShoppingCart size={24} />
          </button>
          <div className="badge bg-amber-500">{cartProducts.length}</div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-60 p-2 shadow-sm"
        >
          {cartProducts.length > 0 ? (
            cartProducts.slice(-5).reverse().map((item, index) => (
              <li key={index}>
                <Link
                  to={`/products/${item.id}`}
                  className="flex space-x-2 items-center"
                >
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-center text-sm text-gray-500">
              No items in cart
            </li>
          )}
          <li>
            <Link to="/card" className="text-indigo-500 hover:underline justify-center">
              View all
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavCard;
