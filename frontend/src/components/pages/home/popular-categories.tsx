import { Link } from "react-router-dom";
import { Categories } from "../../../utils/categories";

const PopularCategories = () => {
  return (
    <div>
      <h2 className=" basic-title">Shop our most popular categories</h2>
      <div className=" flex space-x-4 items-center justify-center mt-4">
        {Categories.map((item, index) => {
          return (
            <Link to={`/products?category=${item.name}`} key={index} className=" flex flex-col space-y-1">
              <div className="avatar">
                <div className="w-48 rounded-xl h-52  ">
                  <img src={item.image} />
                </div>
              </div>
              <span className=" font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
