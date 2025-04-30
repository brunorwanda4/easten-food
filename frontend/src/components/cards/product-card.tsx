import { useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { IoBagAddOutline } from "react-icons/io5";
import { cn } from "../../utils/utils";
import { productProps } from "../../data/products";
import { Link } from "react-router-dom";

interface props {
  className?: string;
  noDescription?: boolean;
  isSmallBtn?: boolean;
  product: productProps;
}

const ProductCard = ({
  className,
  isSmallBtn,
  noDescription,
  product,
}: props) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(cart.includes(product.id));
  }, [product.id]);

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
    <div
      className={cn(
        "card bg-base-100 w-96 duration-150 hover:shadow-lg shadow-sm ",
        className
      )}
    >
      <div className="avatar">
        <div className="w-full h-60 rounded-b-none rounded-t-2xl">
          <Link to={`/products/${product.id}`}>
            <img
              alt={cn("Image not found:", product.name)}
              src={product.image}
            />
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div>
          <div className="justify-between flex">
            <h2 className="card-title line-clamp-1">{product.name}</h2>
            <div className="flex">
              <span className="card-title">{product.rating}</span>
              <div className="rating">
                <input
                  type="radio"
                  name={product.id}
                  defaultChecked
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="1 star"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="basic-title">{product.price} RWF</h3>
            <h4 className="link-hover">{product.category}</h4>
          </div>
        </div>

        {!noDescription && <p>{product.description}</p>}

        <div className="card-actions">
          <div className={cn("flex space-x-2 justify-end w-full max-md:flex-col max-md:space-y-1" , isSmallBtn && "flex-row-reverse justify-between relative")}>
            <button
              onClick={() => toggleCart()}
              className={cn(
                "btn tooltip tooltip-bottom",
                isInCart ? "btn-error" : ""
              )}
              data-tip={cn(isSmallBtn ? isInCart ? "Remove Cart" : "Add to cart" : null)}
            >
              <PiShoppingCart size={24} />
              {!isSmallBtn && (isInCart ? "Remove Cart" : "Add to cart")}
            </button>
            <Link
              to={`/products/${product.id}`}
              className={cn("btn bg-amber-500", isSmallBtn && " w-2/3 max-md:w-full")}
            >
              <IoBagAddOutline size={24} /> Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
