import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Categories } from "../../../utils/categories";
import { fakeProducts } from "../../../data/products";

const ProductAside = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const prices = fakeProducts.map((product) => product.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const [minPrice, setMinPrice] = useState<number>(
    Number(searchParams.get("minPrice")) || lowestPrice
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    Number(searchParams.get("maxPrice")) || highestPrice
  );

  const handleCategoryClick = (category: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("category", category);
    navigate({ search: newParams.toString() });
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (type === "min") {
      setMinPrice(value);
      newParams.set("minPrice", value.toString());
    } else {
      setMaxPrice(value);
      newParams.set("maxPrice", value.toString());
    }
    navigate({ search: newParams.toString() });
  };

  const removePrice = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("minPrice");
    setMinPrice(lowestPrice);
    newParams.delete("maxPrice");
    setMaxPrice(highestPrice);
    setSearchParams(newParams);
  };

  const removeCategory = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("category");
    setSearchParams(newParams);
  };

  const [minRating, setMinRating] = useState<number>(
    Number(searchParams.get("minRating")) || 1
  );
  const [maxRating, setMaxRating] = useState<number>(
    Number(searchParams.get("maxRating")) || 5
  );

  const removeRating = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("minRating");
    newParams.delete("maxRating");
    setMinRating(1);
    setMaxRating(5);
    setSearchParams(newParams);
  };

  const handleRatingChange = (type: "min" | "max", value: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (type === "min") {
      setMinRating(value);
      newParams.set("minRating", value.toString());
    } else {
      setMaxRating(value);
      newParams.set("maxRating", value.toString());
    }
    navigate({ search: newParams.toString() });
  };
  

  return (
    <aside className=" w-80 border-r border-r-zinc-300 px-4 bg-base-100 space-y-2">
      <div>
        <h3
          onClick={() => removeCategory()}
          className=" font-medium text-lg cursor-pointer"
        >
          All Categories
        </h3>
        <ul className="flex flex-col space-y-2 mt-2">
          {Categories.map((item, index) => {
            const isSelected = selectedCategory === item.name;
            const total = fakeProducts.filter(
              (i) => i.category === item.name
            ).length;
            return (
              <li
                key={index}
                className={`btn btn-ghost btn-sm justify-start cursor-pointer ${
                  isSelected ? "bg-zinc-200" : ""
                }`}
                onClick={() => handleCategoryClick(item.name)}
              >
                <div className="flex w-full justify-between items-center">
                  <div className="flex space-x-1 items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-md"
                      checked={isSelected}
                      readOnly
                    />
                    <span className=" text-lg">{item.name}</span>
                  </div>
                  <span className="badge bg-amber-500">{total}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col space-y-4">
        <h3
          className="font-medium text-lg cursor-pointer"
          onClick={() => removePrice()}
        >
          Price in Rwanda Francs
        </h3>

        {/* Min Price */}
        <div>
          <label htmlFor="min" className="font-medium">
            Minimum Price: {minPrice} RWF
          </label>
          <input
            type="range"
            min={lowestPrice}
            max={highestPrice}
            value={minPrice}
            className="range"
            onChange={(e) => handlePriceChange("min", Number(e.target.value))}
          />
          <div className="justify-between flex">
            <span>{lowestPrice} RWF</span> <span>{highestPrice} RWF</span>
          </div>
        </div>

        {/* Max Price */}
        <div>
          <label htmlFor="max" className="font-medium">
            Maximum Price: {maxPrice} RWF
          </label>
          <input
            type="range"
            min={lowestPrice}
            max={highestPrice}
            value={maxPrice}
            className="range"
            onChange={(e) => handlePriceChange("max", Number(e.target.value))}
          />
          <div className="justify-between flex">
            <span>{lowestPrice} RWF</span> <span>{highestPrice} RWF</span>
          </div>
        </div>
      </div>
      {/* rating */}
      <div>
  <h3 className="font-medium text-lg cursor-pointer" onClick={removeRating}>
    Rating
  </h3>

  {/* Min Rating */}
  <div className="flex flex-col">
    <label className="font-medium">Minimum Rating: {minRating}</label>
    <div className="rating rating-xl">
      {[1, 2, 3, 4, 5].map((value) => (
        <input
          key={value}
          type="radio"
          name="minRating"
          className="mask mask-star-2 bg-orange-400"
          checked={minRating === value}
          onChange={() => handleRatingChange("min", value)}
        />
      ))}
    </div>
  </div>

  {/* Max Rating */}
  <div className="flex flex-col mt-2">
    <label className="font-medium">Maximum Rating: {maxRating}</label>
    <div className="rating rating-xl">
      {[1, 2, 3, 4, 5].map((value) => (
        <input
          key={value}
          type="radio"
          name="maxRating"
          className="mask mask-star-2 bg-orange-400"
          checked={maxRating === value}
          onChange={() => handleRatingChange("max", value)}
        />
      ))}
    </div>
  </div>
</div>

    </aside>
  );
};

export default ProductAside;
