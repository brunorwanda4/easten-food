import { useEffect, useState, useRef } from "react";
import { fakeProducts, productProps } from "../../../data/products";
import { Link } from "react-router-dom";

const HeroCard = () => {
  const [lastProduct, setLastProduct] = useState<productProps | null>(null);
  const lastProductIdRef = useRef<string | null>(null);

  useEffect(() => {
    const updateLastProduct = () => {
      const cartIds: string[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const products = cartIds.reverse();
      const filteredProducts = fakeProducts.filter((product) =>
        products.includes(product.id)
      );
      const latest = filteredProducts[0] || null;
      const latestId = latest?.id || null;

      if (latestId !== lastProductIdRef.current) {
        setLastProduct(latest);
        lastProductIdRef.current = latestId;
      }
    };

    updateLastProduct();
    const interval = setInterval(updateLastProduct, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-full duration-150 hover:shadow-lg shadow-sm">
      {lastProduct ? (
        <div className="card h-96 w-full hover:shadow-lg duration-200">
          <div className="avatar">
            <div className="w-full h-96 rounded-2xl">
              <img src={lastProduct.image} alt={lastProduct.name} />
            </div>
          </div>
          <div className="card-body absolute bg-gradient-to-b bottom-0 from-transparent to-black text-white rounded-b-2xl w-full">
            <h2 className="card-title">{lastProduct.name}</h2>
            <p>{lastProduct.description}</p>
            <Link
              to={`/products/${lastProduct.id}`}
              className="card-title text-indigo-500 btn btn-ghost w-fit"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="card w-full hover:shadow-lg duration-200">
          <div className="avatar">
            <div className="w-full h-96 rounded-2xl">
              <img
                src={
                  "https://i.pinimg.com/474x/2f/33/fc/2f33fcdd4752c024ced91ba1f5e1bb1f.jpg"
                }
                alt="Default product"
              />
            </div>
          </div>
          <div className="card-body absolute bg-gradient-to-b bottom-0 from-transparent to-black text-white rounded-b-2xl w-full">
            <h2 className="card-title">
              Hurry! Some products are gone — add some thing in you cart!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCard;
